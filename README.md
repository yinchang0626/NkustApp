# 2019-11-13
1.Install Java , Android Studio  
2.Install gradle (https://gradle.org/releases/) ,及環境變數  
3.ionic cordova build android (產生debug apk,可安裝無法上架)  
4.ionic cordova build android --release   (產生unsinged-apk無法上架與安裝)  
3.Java Keytool 環境變數，確認指令 keytool 可執行  
4.建立 key
``` cmd
keytool -genkey -v -keystore android.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias android
```
5.將key放在Ionic根目錄且建立檔案 build.json  
``` json
{
    "android": {
        "debug": {
            "keystore": "./android.keystore",
            "storePassword": "android",
            "alias": "android",
            "password" : "password"
        },
        "release": {
            "keystore": "./android.keystore",
            "storePassword": "",
            "alias": "android",
            "password" : "password"
        }
    }
}
```
6.ionic cordova build android --release  
7 參考 ionic deploy 文件 及 cordova 文件  



# 2019-10-31  
1.藍芽連線裝置(使用https://ionicframework.com/docs/native/ble)  
2.下載 android studio 及 JDK 8 (https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)  
3.Ionic 部分指令說明  
``` cmd
  //plugins新增cordova 外掛元件(如電池資訊，相機,GPS)
  ionic cordova plugin add <pluginName>
  //platform: 可新增 ios (macOs),android
  ionic cordova platform add <ios or android>
  ionic cordova platform remove <ios or android> 移除
  //build:根據目前的 platform,選擇產生出對應的apk
  ionic cordova build <android or ios>
  //resources:建立 app 小圖示
  ionic cordova resources
  //可參考 https://ionicframework.com/docs/cli/commands/cordova-resources
```

# 2019-10-24
1.後端程式  
2.架設及發佈網站，MS SQLSERVER   

# 2019-10-17
1.先執行WebApplication3 ，按下sln副檔名會開啟visual studiom, F5(編譯後)，Visual Studio 會建立網站並開啟網頁(<http://localhost:57271/>)    
2.Ionic : nkust1017 , 執行後，API預設連接到 http://localhost:57271/
3.Angular 參考資料 : <https://angular.io/guide/http>
4. Android debug Tool : <https://play.google.com/store/apps/details?id=io.ionic.devapp>
# 2019-10-03
1.建立 WebApi 網站，及資料庫連線  

### 後端資料庫

在 /Data/Question.cs
``` csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication3.Data
{
    public class Question
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        public string Title { get; set; }
        public string Ans { get; set; }
    }
}

```

2.在套件管理器主控台  
``` cmd
PM->Add-Migration yourname
PM->Update-Database
```
3.新增Controllers/QuestionsController.cs
``` sharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication3.Data;

namespace WebApplication3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public QuestionsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Questions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Question>>> GetQuestions()
        {
            return await _context.Questions.ToListAsync();
        }

        // GET: api/Questions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Question>> GetQuestion(long id)
        {
            var question = await _context.Questions.FindAsync(id);

            if (question == null)
            {
                return NotFound();
            }

            return question;
        }

        // PUT: api/Questions/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuestion(long id, Question question)
        {
            if (id != question.Id)
            {
                return BadRequest();
            }

            _context.Entry(question).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuestionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Questions
        [HttpPost]
        public async Task<ActionResult<Question>> PostQuestion(Question question)
        {
            _context.Questions.Add(question);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetQuestion", new { id = question.Id }, question);
        }

        // DELETE: api/Questions/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Question>> DeleteQuestion(long id)
        {
            var question = await _context.Questions.FindAsync(id);
            if (question == null)
            {
                return NotFound();
            }

            _context.Questions.Remove(question);
            await _context.SaveChangesAsync();

            return question;
        }

        private bool QuestionExists(long id)
        {
            return _context.Questions.Any(e => e.Id == id);
        }
    }
}

```



## 安裝 swagger
1.nuget 管理工具新增 Microsoft.AspNet.WebApi,Swashbuckle.AspNetCore  
2.文件初始化
3.修改Startup.cs
``` csharp
...
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "My API", Version = "v1" });
            });
 ...
...
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            });
...
```
4.瀏覽器網址補上 /swagger
5.參考連結:<https://docs.microsoft.com/zh-tw/aspnet/core/tutorials/getting-started-with-swashbuckle?view=aspnetcore-3.0&tabs=visual-studio>






--------------------------

# 注意事項  
 
安裝nodejs:https://nodejs.org/en/  

cmd
npm -g ionic


開發用指令

``` cmd
ionic start AppName
cd ./AppName
ionic serve -l
```  

從Github下載的檔案  
1.須執行在目錄下 執行 npm install  


-----------------------------------------

# 2019-09-26

參考連結  
angular : https://angular.io/start
ionic : https://ionicframework.com/docs
typescript: https://www.typescriptlang.org/
javascript(可查看陣列操作) : https://developer.mozilla.org/zh-TW/docs/Web/JavaScript

查看 docs 資料夾:0926下課練習.pptx

建立一個簡易列表，並可對資料簡易CRUD操作  
1.在第二個TAB建立 一個 List Component(可將 router預設轉為 tab2)  
2.建立測試資料，綁定資料  
3.利用 ion-modal 做新增修改刪除  
3.建立ion-select 綁定 Tag 資料  
4.新增資料功能  
5.修改資料功能  
6.刪除資料功能  




