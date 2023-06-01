from bs4 import BeautifulSoup
from selenium import webdriver
import numpy as np
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.chrome.options import Options


def class_info(uid,pw):
    try:

        '''--------------------向校務系統索取學生課程資料-----------------------------'''
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        #預設瀏覽器
        driver = webdriver.Chrome(options=chrome_options)
        #連結至淡江sso
        driver.get('https://sso.tku.edu.tw/NEAI/logineb.jsp?myurl=https://sso.tku.edu.tw/aissinfo/emis/tmw0012.aspx') # 更改網址以前往不同網頁
        #使用者資料
        username=str(uid)
        password=str(pw)
        
        #填寫帳號密碼
        elem_user = driver.find_element('id','username')
        elem_user.clear()
        elem_user.send_keys(username)
        
        elem_pw =driver.find_element('id','password')
        elem_pw.clear()
        elem_pw.send_keys(password)
        
        elem_btn=driver.find_element('id','loginbtn')
        elem_btn.click()
        
        #連結至校務系統-課表
        driver.get('https://sso.tku.edu.tw/aissinfo/emis/TMWC020.aspx')
        elem_acc=driver.find_element('id','Button1')
        elem_acc.click()
        
        #取得課表url，使用BeautifulSoup分析
        source = driver.page_source
        soup = BeautifulSoup(source, 'html.parser')
        
        #計算tr數量
        n=0
        for tt in soup.find_all('table')[1].select('tr'):
           n=n+1
        '''------------------取得課程代碼------------------'''
        arr=[]
        for i in range(1,n):
            t=soup.find_all('table')[1].find_all('tr')[i].find_all('td')[0]
            arr.append(t.text if t else "正課")
        
        index =["正課","N/A"]
        #單純取課程代碼
        newarr=np.setdiff1d(arr,index )

        cid=[0]*len(newarr)
        cname=[0]*len(newarr)
        cteacher=[0]*len(newarr)
        ctime=[0]*len(newarr)

        for i in range(1,n):
            ct=soup.find_all('table')[1].find_all('tr')[i].find_all('td')[10].getText()
            #print(ct)
            if(ct=='\xa0'):
                ct='尚未安排教師'
            cteacher[i-1]=ct
        #-----------------------------------------------
        driver.close() # 關閉瀏覽器視窗
        

        

        #---------------------根據課表資料調閱課程時間------------------------------
        driver2 = webdriver.Chrome(options=chrome_options)
        #arr2=[]
        cno=0
        for no in range(0,len(newarr)):
            num =newarr[no]
            driver2.get("https://esquery.tku.edu.tw/acad/query.asp") # 更改網址以前往不同網頁
            
            button = driver2.find_element('id','Radio6')
            button.click()
            
            element = driver2.find_element('name','classno')
            element.send_keys(num)
            element.send_keys('\ue007')
            
            source = driver2.page_source
            soup = BeautifulSoup(source, "html.parser")
        
            #計算tr數量
            n=0
            for tt in soup.find_all('table')[1].select('tr'):
               n=n+1
            
            for i in range(3,n):
                c1=str(soup.find_all('table')[1].find_all('tr')[i].find_all('td')[2].find('span').getText())
                #c2=soup.find_all('table')[1].find_all('tr')[i].find_all('td')[2].find("font", {"color": {"blue","DD0080"}}).getText()
                cn=str(soup.find_all('table')[1].find_all('tr')[i].find_all('td')[11].find("font", {"color": {"blue"}}).getText())
                t2=soup.find_all('table')[1].find_all('tr')[i].find_all('td')[14].getText().split('/')
                #t3=soup.find_all('table')[1].find_all('tr')[i].find_all('td')[15].getText().split('/')
                tt=str('星期'+t2[0].strip()+'  '+'第'+t2[1].strip()+'節')
                #ct=str(soup.find_all('table')[1].find_all('tr')[i].find_all('td')[13].getText())
                #print(newarr[no]+tt)

                cid[cno]=c1
                cname[cno]=cn
                #cteacher[cno]=ct
                ctime[cno]=tt
                cno=cno+1
                
        driver2.close() # 關閉瀏覽器視窗
        
        arr3=[cid,cname,cteacher,ctime]

        #---------------------------進行檔案匯出-----------------------------------   
        '''
        filename = 'test.txt'
        file=open(filename,'wt')
        for i in range(0,len(arr2)):
            print(arr2[i])
            file.write(str(arr2[i]+'\n'))
        file.close()
        '''
        return(arr3)
    except NoSuchElementException:
        return('ValueError')