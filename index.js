const express = require('express')
const app = express()
const cors = require('cors')
const nodeHtmlToImage = require('node-html-to-image')
const fs = require('fs');
//const font2base64 = require('node-font2base64')
const bodyParser = require("body-parser")

app.use(express.static(__dirname + '/public'));

// ***** LOLLAPALOOZA POSTER ***** //

const imageCloud2 = fs.readFileSync('./public/cloud2.png');
const base64ImageCloud2 = new Buffer.from(imageCloud2).toString('base64');
const dataURICloud2 = 'data:image/jpeg;base64,' + base64ImageCloud2

const imageCloud3 = fs.readFileSync('./public/cloud3.png');
const base64ImageCloud3 = new Buffer.from(imageCloud3).toString('base64');
const dataURICloud3 = 'data:image/jpeg;base64,' + base64ImageCloud3

const imageKite = fs.readFileSync('./public/kite.png');
const base64ImageKite = new Buffer.from(imageKite).toString('base64');
const dataURIKite = 'data:image/jpeg;base64,' + base64ImageKite

const imageKite2 = fs.readFileSync('./public/kite2.png');
const base64ImageKite2 = new Buffer.from(imageKite2).toString('base64');
const dataURIKite2 = 'data:image/jpeg;base64,' + base64ImageKite2

const imageKite3 = fs.readFileSync('./public/kite3.png');
const base64ImageKite3 = new Buffer.from(imageKite3).toString('base64');
const dataURIKite3 = 'data:image/jpeg;base64,' + base64ImageKite3

const imageKite4 = fs.readFileSync('./public/kite4.png');
const base64ImageKite4 = new Buffer.from(imageKite4).toString('base64');
const dataURIKite4 = 'data:image/jpeg;base64,' + base64ImageKite4

const imageLollapalooza = fs.readFileSync('./public/lollapalooza.png');
const base64ImageLollapalooza = new Buffer.from(imageLollapalooza).toString('base64');
const dataURILollapalooza = 'data:image/jpeg;base64,' + base64ImageLollapalooza
// ***** LOLLAPALOOZA POSTER ***** // 

const imageFantasy01 = fs.readFileSync('./public/fantasy_background.png');
const base64ImageFantasy01 = new Buffer.from(imageFantasy01).toString('base64');
const dataURIFantasy01 = 'data:image/jpeg;base64,' + base64ImageFantasy01

const imageFantasy01Circle = fs.readFileSync('./public/main_circle.png');
const base64ImageFantasy01Circle = new Buffer.from(imageFantasy01Circle).toString('base64');
const dataURIFantasy01Circle = 'data:image/jpeg;base64,' + base64ImageFantasy01Circle

var corsOptions = {
	origin: "https://dream-festival-lineup-front.vercel.app/",
};

app.use(cors(corsOptions));
app.use(bodyParser.json())

app.get('/', (req, res) => {
    console.log(req.body)
	res.json({'message': 'ok'});
})

app.post('/generate', (req, res) => {
    console.log(req.body)
    const data = req.body.data
    const themeSelected = req.body.theme

    let poster;

    const htmlData = `
    <html>
    <head>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Passion+One:wght@400;700;900&display=swap');
        body{
            width:960px;
            height:960px;
            font-family: 'Passion One', cursive;
        }
        .cont{
            background: rgb(0,140,228);
            background: linear-gradient(180deg, rgba(0,140,228,1) 0%, rgba(209,241,255,1) 100%);
            width:960px;
            height:960px;
            display:flex;
            justify-content: center;
            align-items: center;
            margin:0 auto;
            flex-direction: column;
            overflow:hidden;
            font-family: 'Passion One', cursive;
          }

          .cloud{
            width:70px;
            position: absolute;
            right:0;
            top:0;
            transform: translateY(200px);
          }
          
          .cloud2{
            width:100px;
            position: absolute;
            left:80px;
            top:10px;
          }
          
          .cloud3{
            width:120px;
            position: absolute;
            right:110px;
            top:40px; 
          }
          
          .cloud4{
            width:90px;
            position: absolute;
            right:150px;
            bottom:40px;
          }
          
          .cloud5{
            width:90px;
            position: absolute;
            left:150px;
            bottom:40px;
            transform: scaleX(-1);
          }

          .posterContainer{
            display:flex;
            justify-content:space-evenly;
            align-items: center;
            width:80%;
            margin:20px;
            flex-wrap:wrap;
            font-family: 'Passion One', cursive;
          }

          img{
            width:30%;
          }

          .headlinersCont{
            display:flex;
            width:100%;
            justify-content:center;
            flex-wrap:wrap;
            
        }
      
        .blockCont{
            display:flex;
            width:100%;
            flex-wrap:wrap;
            justify-content:space-between;
            
        }

        .headliner{
            font-size:44px;
            text-transform:uppercase;
            color: rgba(20,20,20);
            margin:0 17px;
            position:relative;
            font-weight:700;
            letter-spacing:-1px;
        }

        .headliner::after{
            content:"";
            width:12px;
            height:12px;
            background-color: #8effab;
            position:absolute;
            transform: translateX(90%) rotate(45deg);
            top: 17px;
        }
    
        .headliner:last-of-type{
            ::after{
                content:"";
                width:0;
                height:0;
            }
        }

        .secondary{
            font-size:26px;
            text-transform:uppercase;
            color: rgba(20,20,20);
            margin:0 17px;
            position:relative;
        }

        .secondary::after{
            content:"";
            width:8px;
            height:8px;
            background-color: #8effab;
            position:absolute;
            transform: translateX(160%) rotate(45deg);
            top: 10px;
        }
    
        .secondary:last-of-type{
            ::after{
                content:"";
                width:0;
                height:0;
            }
        }

        .others{
            font-size:20px;
            text-transform:uppercase;
            color: rgba(20,20,20);
            margin:0 8px;
            position:relative;
        }

        .others::after{
            content:"";
            width:5px;
            height:5px;
            background-color: #8effab;
            position:absolute;
            transform: translateX(120%) rotate(45deg);
            top: 8px;
        }
    
        .others:last-of-type{
            ::after{
                content:"";
                width:0;
                height:0;
            }
        }

        .kite{
            width:90px;
            position: absolute;
            left:20px;
            bottom:-10px;
          }
          
          .kite2{
            width:120px;
            position: absolute;
            left:-15px;
            top:150px;
            transform: rotate(10deg);
          }
          
          .kite3{
            width:120px;
            position: absolute;
            left:-20px;
            top:400px;
            transform: rotate(30deg); 
          }

          
        .kite4{
            width:120px;
            position: absolute;
            right:-30px;
            top:400px;
            transform: rotate(-2deg);
        }
        
        .kite5{
            width:90px;
            position: absolute;
            right:20px;
            bottom:-10px;
            transform: rotate(-10deg);
        }

          .day{
            font-size:28px;
            text-transform:uppercase;
            margin:0 7px;
            text-shadow: -1px 1px 3px #272727;
            text-shadow: 2px 2px 0 #2d2d2d, 2px -2px 0 #2d2d2d, -2px 2px 0 #2d2d2d, -2px -2px 0 #2d2d2d, 2px 0px 0 #2d2d2d, 0px 2px 0 #2d2d2d, -2px 0px 0 #2d2d2d, 0px -2px 0 #2d2d2d;
          }

          .friday{
            color: #51fa65;
          }

          .saturday{
            color: #fcdc01;
          }

          .sunday{
            color: #fe3eb4;
          }
      </style>
    </head>
    <body>
        <div class="cont"> 
            <img src="${dataURICloud2}" alt="cloud" class='cloud2'/>
            <img src="${dataURICloud3}" alt="cloud" class='cloud'/>
            <img src="${dataURICloud3}" alt="cloud" class='cloud3'/>
            <img src="${dataURIKite}" alt="kite" class='kite'/>
            <img src="${dataURIKite}" alt="kite" class='kite5'/>
            <img src="${dataURIKite2}" alt="kite" class='kite2'/>
            <img src="${dataURIKite3}" alt="kite" class='kite3'/>
            <img src="${dataURIKite4}" alt="kite" class='kite4'/>
            <img src="${dataURICloud2}" alt="cloud" class='cloud4'/>
            <img src="${dataURICloud2}" alt="cloud" class='cloud5'/>
            <img src="${dataURILollapalooza}" alt="lolla"/>
            ${data.friday.headliners.length != 0 || data.friday.secondary.length != 0 || data.friday.others.length != 0 ? 
                `<div class="posterContainer">
                    <span class="day friday">FRIDAY</span>
                    <div class="headlinersCont">
                        ${data.friday.headliners[0] ? `<span class="headliner">${data.friday.headliners[0]}</span>` : ''}
                        ${data.friday.headliners[1] ? `<span class="headliner">${data.friday.headliners[1]}</span>` : ''}
                        ${data.friday.headliners[2] ? `<span class="headliner">${data.friday.headliners[2]}</span>` : ''}
                    </div>
                    <div class="headlinersCont">
                        ${data.friday.secondary[0] ? `<span class="secondary">${data.friday.secondary[0]}</span>` : ''}
                        ${data.friday.secondary[1] ? `<span class="secondary">${data.friday.secondary[1]}</span>` : ''}
                        ${data.friday.secondary[2] ? `<span class="secondary">${data.friday.secondary[2]}</span>` : ''}
                        ${data.friday.secondary[3] ? `<span class="secondary">${data.friday.secondary[3]}</span>` : ''}
                        ${data.friday.secondary[4] ? `<span class="secondary">${data.friday.secondary[4]}</span>` : ''}
                        ${data.friday.secondary[5] ? `<span class="secondary">${data.friday.secondary[5]}</span>` : ''}
                        ${data.friday.secondary[6] ? `<span class="secondary">${data.friday.secondary[6]}</span>` : ''}
                        ${data.friday.secondary[7] ? `<span class="secondary">${data.friday.secondary[7]}</span>` : ''}
                        ${data.friday.secondary[8] ? `<span class="secondary">${data.friday.secondary[8]}</span>` : ''}
                    </div>
                    <div class="headlinersCont">
                        ${data.friday.others[0] ? `<span class="others">${data.friday.others[0]}</span>` : ''}
                        ${data.friday.others[1] ? `<span class="others">${data.friday.others[1]}</span>` : ''}
                        ${data.friday.others[2] ? `<span class="others">${data.friday.others[2]}</span>` : ''}
                        ${data.friday.others[3] ? `<span class="others">${data.friday.others[3]}</span>` : ''}
                        ${data.friday.others[4] ? `<span class="others">${data.friday.others[4]}</span>` : ''}
                        ${data.friday.others[5] ? `<span class="others">${data.friday.others[5]}</span>` : ''}
                        ${data.friday.others[6] ? `<span class="others">${data.friday.others[6]}</span>` : ''}
                        ${data.friday.others[7] ? `<span class="others">${data.friday.others[7]}</span>` : ''}
                        ${data.friday.others[8] ? `<span class="others">${data.friday.others[8]}</span>` : ''}
                        ${data.friday.others[9] ? `<span class="others">${data.friday.others[9]}</span>` : ''}
                        ${data.friday.others[10] ? `<span class="others">${data.friday.others[10]}</span>` : ''}
                        ${data.friday.others[11] ? `<span class="others">${data.friday.others[11]}</span>` : ''}
                        ${data.friday.others[12] ? `<span class="others">${data.friday.others[12]}</span>` : ''}
                        ${data.friday.others[13] ? `<span class="others">${data.friday.others[13]}</span>` : ''}
                        ${data.friday.others[14] ? `<span class="others">${data.friday.others[14]}</span>` : ''}
                    </div>
                </div>` 
            : ""}

            ${data.saturday.headliners.length != 0 || data.saturday.secondary.length != 0 || data.saturday.others.length != 0 ? 
                `<div class="posterContainer">
                    <span class="day saturday">SATURDAY</span>
                    <div class="headlinersCont">
                        ${data.saturday.headliners[0] ? `<span class="headliner">${data.saturday.headliners[0]}</span>` : ''}
                        ${data.saturday.headliners[1] ? `<span class="headliner">${data.saturday.headliners[1]}</span>` : ''}
                        ${data.saturday.headliners[2] ? `<span class="headliner">${data.saturday.headliners[2]}</span>` : ''}
                    </div>
                    <div class="headlinersCont">
                        ${data.saturday.secondary[0] ? `<span class="secondary">${data.saturday.secondary[0]}</span>` : ''}
                        ${data.saturday.secondary[1] ? `<span class="secondary">${data.saturday.secondary[1]}</span>` : ''}
                        ${data.saturday.secondary[2] ? `<span class="secondary">${data.saturday.secondary[2]}</span>` : ''}
                        ${data.saturday.secondary[3] ? `<span class="secondary">${data.saturday.secondary[3]}</span>` : ''}
                        ${data.saturday.secondary[4] ? `<span class="secondary">${data.saturday.secondary[4]}</span>` : ''}
                        ${data.saturday.secondary[5] ? `<span class="secondary">${data.saturday.secondary[5]}</span>` : ''}
                        ${data.saturday.secondary[6] ? `<span class="secondary">${data.saturday.secondary[6]}</span>` : ''}
                        ${data.saturday.secondary[7] ? `<span class="secondary">${data.saturday.secondary[7]}</span>` : ''}
                        ${data.saturday.secondary[8] ? `<span class="secondary">${data.saturday.secondary[8]}</span>` : ''}
                    </div>
                    <div class="headlinersCont">
                        ${data.saturday.others[0] ? `<span class="others">${data.saturday.others[0]}</span>` : ''}
                        ${data.saturday.others[1] ? `<span class="others">${data.saturday.others[1]}</span>` : ''}
                        ${data.saturday.others[2] ? `<span class="others">${data.saturday.others[2]}</span>` : ''}
                        ${data.saturday.others[3] ? `<span class="others">${data.saturday.others[3]}</span>` : ''}
                        ${data.saturday.others[4] ? `<span class="others">${data.saturday.others[4]}</span>` : ''}
                        ${data.saturday.others[5] ? `<span class="others">${data.saturday.others[5]}</span>` : ''}
                        ${data.saturday.others[6] ? `<span class="others">${data.saturday.others[6]}</span>` : ''}
                        ${data.saturday.others[7] ? `<span class="others">${data.saturday.others[7]}</span>` : ''}
                        ${data.saturday.others[8] ? `<span class="others">${data.saturday.others[8]}</span>` : ''}
                        ${data.saturday.others[9] ? `<span class="others">${data.saturday.others[9]}</span>` : ''}
                        ${data.saturday.others[10] ? `<span class="others">${data.saturday.others[10]}</span>` : ''}
                        ${data.saturday.others[11] ? `<span class="others">${data.saturday.others[11]}</span>` : ''}
                        ${data.saturday.others[12] ? `<span class="others">${data.saturday.others[12]}</span>` : ''}
                        ${data.saturday.others[13] ? `<span class="others">${data.saturday.others[13]}</span>` : ''}
                        ${data.saturday.others[14] ? `<span class="others">${data.saturday.others[14]}</span>` : ''}
                    </div>
                </div>`
            : ""}

            ${data.sunday.headliners.length != 0 || data.sunday.secondary.length != 0 || data.sunday.others.length != 0 ? 
                `<div class="posterContainer">
                    <span class="day sunday">SUNDAY</span>
                    <div class="headlinersCont">
                        ${data.sunday.headliners[0] ? `<span class="headliner">${data.sunday.headliners[0]}</span>` : ''}
                        ${data.sunday.headliners[1] ? `<span class="headliner">${data.sunday.headliners[1]}</span>` : ''}
                        ${data.sunday.headliners[2] ? `<span class="headliner">${data.sunday.headliners[2]}</span>` : ''}
                    </div>
                    <div class="headlinersCont">
                        ${data.sunday.secondary[0] ? `<span class="secondary">${data.sunday.secondary[0]}</span>` : ''}
                        ${data.sunday.secondary[1] ? `<span class="secondary">${data.sunday.secondary[1]}</span>` : ''}
                        ${data.sunday.secondary[2] ? `<span class="secondary">${data.sunday.secondary[2]}</span>` : ''}
                        ${data.sunday.secondary[3] ? `<span class="secondary">${data.sunday.secondary[3]}</span>` : ''}
                        ${data.sunday.secondary[4] ? `<span class="secondary">${data.sunday.secondary[4]}</span>` : ''}
                        ${data.sunday.secondary[5] ? `<span class="secondary">${data.sunday.secondary[5]}</span>` : ''}
                        ${data.sunday.secondary[6] ? `<span class="secondary">${data.sunday.secondary[6]}</span>` : ''}
                        ${data.sunday.secondary[7] ? `<span class="secondary">${data.sunday.secondary[7]}</span>` : ''}
                        ${data.sunday.secondary[8] ? `<span class="secondary">${data.sunday.secondary[8]}</span>` : ''}
                    </div>
                    <div class="headlinersCont">
                        ${data.sunday.others[0] ? `<span class="others">${data.sunday.others[0]}</span>` : ''}
                        ${data.sunday.others[1] ? `<span class="others">${data.sunday.others[1]}</span>` : ''}
                        ${data.sunday.others[2] ? `<span class="others">${data.sunday.others[2]}</span>` : ''}
                        ${data.sunday.others[3] ? `<span class="others">${data.sunday.others[3]}</span>` : ''}
                        ${data.sunday.others[4] ? `<span class="others">${data.sunday.others[4]}</span>` : ''}
                        ${data.sunday.others[5] ? `<span class="others">${data.sunday.others[5]}</span>` : ''}
                        ${data.sunday.others[6] ? `<span class="others">${data.sunday.others[6]}</span>` : ''}
                        ${data.sunday.others[7] ? `<span class="others">${data.sunday.others[7]}</span>` : ''}
                        ${data.sunday.others[8] ? `<span class="others">${data.sunday.others[8]}</span>` : ''}
                        ${data.sunday.others[9] ? `<span class="others">${data.sunday.others[9]}</span>` : ''}
                        ${data.sunday.others[10] ? `<span class="others">${data.sunday.others[10]}</span>` : ''}
                        ${data.sunday.others[11] ? `<span class="others">${data.sunday.others[11]}</span>` : ''}
                        ${data.sunday.others[12] ? `<span class="others">${data.sunday.others[12]}</span>` : ''}
                        ${data.sunday.others[13] ? `<span class="others">${data.sunday.others[13]}</span>` : ''}
                        ${data.sunday.others[14] ? `<span class="others">${data.sunday.others[14]}</span>` : ''}
                    </div>
                </div>`
            : ""}
        </div>
    </body>
  </html>
    `

    const fantasy01Html = `
    <html>
    <head>
      <style>
            @import url('https://fonts.googleapis.com/css2?family=Passion+One&family=Philosopher:ital,wght@0,400;0,700;1,400;1,700&family=Poppins:wght@200;300;400;500;600&family=Rubik+Mono+One&family=Spline+Sans:wght@300;400;600;700&display=swap');
            body{
                width:960px;
                height:960px;
            }
            .fantasyCont{
                background-color: rgba(20,20,20);
                width:960px;
                height:100vh;
                display:flex;
                justify-content: center;
                align-items: center;
                margin:0 auto;
                flex-direction: column;
                overflow:hidden;
                background-repeat: no-repeat, repeat;
                background-image: url("${dataURIFantasy01}");
                background-blend-mode: color-dodge	;
            }
            
            .fantasy01Title{
                font-size:20px;
                font-family: 'Philosopher', cursive;
                color: #fff;
                text-transform: uppercase;
                position: relative;
            }

            .fantasy01Title::after{
                content: '';
                width:100px;
                height:1px;
                background-color: #fff;
                position:absolute;
                top: 30px;
                left: 50%;
                transform: translate(-50%, -50%);
                margin:0 auto;
              }

            .posterContainer{
                display:flex;
                justify-content: flex-start;
                align-items: center;
                width:80%;
                margin:20px 0;
                flex-wrap:wrap;
                font-family: 'Philosopher', cursive;
            }

            .headliner{
                font-size:36px;
                text-transform:uppercase;
                color: #fff;
                margin:0px 15px 0 0;
                position:relative;
                font-weight:700;
            }

            .headliner:first-of-type{
                margin-left:0px;
            }

            .secondary{
                font-size:22px;
                text-transform:uppercase;
                color: #fff;
                margin:5px 15px 0 0;
                position:relative;
                font-weight:700;
            }
                    
            secondary:first-of-type{
                margin-left:0px;
            }

            .others{
                font-size:16px;
                text-transform:uppercase;
                color:#fff;
                margin:5px 15px 0 0;
                position:relative;
                font-weight:700;
            }

            .others:first-of-type{
                margin-left:0px;
            }
            
            .day{
                font-size:28px;
                text-transform:uppercase;
                margin:0;
            }

            .friday, .sunday{
                color: #FF9A62;
            }

            .fridayAndSundayArtists{
                background: rgb(255,255,255);
                background: linear-gradient(180deg, rgba(255,255,255,1) 20%, #FF9A62 100%);
                background-clip:text;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }

            .saturdayArtists{
                background: rgb(255,255,255);
                background: linear-gradient(180deg, rgba(255,255,255,1) 20%, #6DC2FF 100%);
                background-clip:text;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }

            .saturday{
                color: #6DC2FF;
            }

            .headlinersCont{
                display:flex;
                width:100%;
                justify-content:flex-start;
                flex-wrap:wrap;
            }

            .saturdayContainer{
                justify-content: flex-end;
            }

            .fantasy01CircleCont{
                display:flex;
                width:100%;
                justify-content: center;
                align-items:center;
            }
              
            .main_circle{
                width:120px;
            }

            .main_circle2{
                width:50px;
                height:50px;
            }
        </style>
    </head>
    <body>
        <div class="fantasyCont"> 
            <div class="fantasy01CircleCont">
                <img src="${dataURIFantasy01Circle}" class="main_circle2" alt="main_circle" />
                <img src="${dataURIFantasy01Circle}" class="main_circle2" alt="main_circle" />
                <img src="${dataURIFantasy01Circle}" class="main_circle2" alt="main_circle" />
                <img src="${dataURIFantasy01Circle}" class="main_circle2" alt="main_circle" />
                <img src="${dataURIFantasy01Circle}" class="main_circle2" alt="main_circle" />
                <img src="${dataURIFantasy01Circle}" class="main_circle2" alt="main_circle" />
                <img src="${dataURIFantasy01Circle}" class="main_circle2" alt="main_circle" />
                <img src="${dataURIFantasy01Circle}" class="main_circle2" alt="main_circle" />
                <img src="${dataURIFantasy01Circle}" class="main_circle" alt="main_circle" />
                <img src="${dataURIFantasy01Circle}" class="main_circle2" alt="main_circle" />
                <img src="${dataURIFantasy01Circle}" class="main_circle2" alt="main_circle" />
                <img src="${dataURIFantasy01Circle}" class="main_circle2" alt="main_circle" />
                <img src="${dataURIFantasy01Circle}" class="main_circle2" alt="main_circle" />
                <img src="${dataURIFantasy01Circle}" class="main_circle2" alt="main_circle" />
                <img src="${dataURIFantasy01Circle}" class="main_circle2" alt="main_circle" />
                <img src="${dataURIFantasy01Circle}" class="main_circle2" alt="main_circle" />
                <img src="${dataURIFantasy01Circle}" class="main_circle2" alt="main_circle" />
            </div>
            <h1 class="fantasy01Title">My Dream Festival Lineup</h1>
            ${data.friday.headliners.length != 0 || data.friday.secondary.length != 0 || data.friday.others.length != 0 ? 
                `<div class="posterContainer">
                    <span class="day friday">FRIDAY</span>
                    <div class="headlinersCont">
                        ${data.friday.headliners[0] ? `<span class="headliner fridayAndSundayArtists">${data.friday.headliners[0]}</span>` : ''}
                        ${data.friday.headliners[1] ? `<span class="headliner fridayAndSundayArtists">${data.friday.headliners[1]}</span>` : ''}
                        ${data.friday.headliners[2] ? `<span class="headliner fridayAndSundayArtists">${data.friday.headliners[2]}</span>` : ''}
                    </div>
                    <div class="headlinersCont">
                        ${data.friday.secondary[0] ? `<span class="secondary fridayAndSundayArtists">${data.friday.secondary[0]}</span>` : ''}
                        ${data.friday.secondary[1] ? `<span class="secondary fridayAndSundayArtists">${data.friday.secondary[1]}</span>` : ''}
                        ${data.friday.secondary[2] ? `<span class="secondary fridayAndSundayArtists">${data.friday.secondary[2]}</span>` : ''}
                        ${data.friday.secondary[3] ? `<span class="secondary fridayAndSundayArtists">${data.friday.secondary[3]}</span>` : ''}
                        ${data.friday.secondary[4] ? `<span class="secondary fridayAndSundayArtists">${data.friday.secondary[4]}</span>` : ''}
                        ${data.friday.secondary[5] ? `<span class="secondary fridayAndSundayArtists">${data.friday.secondary[5]}</span>` : ''}
                        ${data.friday.secondary[6] ? `<span class="secondary fridayAndSundayArtists">${data.friday.secondary[6]}</span>` : ''}
                        ${data.friday.secondary[7] ? `<span class="secondary fridayAndSundayArtists">${data.friday.secondary[7]}</span>` : ''}
                        ${data.friday.secondary[8] ? `<span class="secondary fridayAndSundayArtists">${data.friday.secondary[8]}</span>` : ''}
                    </div>
                    <div class="headlinersCont">
                        ${data.friday.others[0] ? `<span class="others fridayAndSundayArtists">${data.friday.others[0]}</span>` : ''}
                        ${data.friday.others[1] ? `<span class="others fridayAndSundayArtists">${data.friday.others[1]}</span>` : ''}
                        ${data.friday.others[2] ? `<span class="others fridayAndSundayArtists">${data.friday.others[2]}</span>` : ''}
                        ${data.friday.others[3] ? `<span class="others fridayAndSundayArtists">${data.friday.others[3]}</span>` : ''}
                        ${data.friday.others[4] ? `<span class="others fridayAndSundayArtists">${data.friday.others[4]}</span>` : ''}
                        ${data.friday.others[5] ? `<span class="others fridayAndSundayArtists">${data.friday.others[5]}</span>` : ''}
                        ${data.friday.others[6] ? `<span class="others fridayAndSundayArtists">${data.friday.others[6]}</span>` : ''}
                        ${data.friday.others[7] ? `<span class="others fridayAndSundayArtists">${data.friday.others[7]}</span>` : ''}
                        ${data.friday.others[8] ? `<span class="others fridayAndSundayArtists">${data.friday.others[8]}</span>` : ''}
                        ${data.friday.others[9] ? `<span class="others fridayAndSundayArtists">${data.friday.others[9]}</span>` : ''}
                        ${data.friday.others[10] ? `<span class="others fridayAndSundayArtists">${data.friday.others[10]}</span>` : ''}
                        ${data.friday.others[11] ? `<span class="others fridayAndSundayArtists">${data.friday.others[11]}</span>` : ''}
                        ${data.friday.others[12] ? `<span class="others fridayAndSundayArtists">${data.friday.others[12]}</span>` : ''}
                        ${data.friday.others[13] ? `<span class="others fridayAndSundayArtists">${data.friday.others[13]}</span>` : ''}
                        ${data.friday.others[14] ? `<span class="others fridayAndSundayArtists">${data.friday.others[14]}</span>` : ''}
                    </div>
                </div>` 
            : ""}

            ${data.saturday.headliners.length != 0 || data.saturday.secondary.length != 0 || data.saturday.others.length != 0 ? 
                `<div class="posterContainer saturdayContainer">
                    <span class="day saturday">SATURDAY</span>
                    <div class="headlinersCont saturdayContainer">
                        ${data.saturday.headliners[0] ? `<span class="headliner saturdayArtists">${data.saturday.headliners[0]}</span>` : ''}
                        ${data.saturday.headliners[1] ? `<span class="headliner saturdayArtists">${data.saturday.headliners[1]}</span>` : ''}
                        ${data.saturday.headliners[2] ? `<span class="headliner saturdayArtists">${data.saturday.headliners[2]}</span>` : ''}
                    </div>
                    <div class="headlinersCont saturdayContainer">
                        ${data.saturday.secondary[0] ? `<span class="secondary saturdayArtists">${data.saturday.secondary[0]}</span>` : ''}
                        ${data.saturday.secondary[1] ? `<span class="secondary saturdayArtists">${data.saturday.secondary[1]}</span>` : ''}
                        ${data.saturday.secondary[2] ? `<span class="secondary saturdayArtists">${data.saturday.secondary[2]}</span>` : ''}
                        ${data.saturday.secondary[3] ? `<span class="secondary saturdayArtists">${data.saturday.secondary[3]}</span>` : ''}
                        ${data.saturday.secondary[4] ? `<span class="secondary saturdayArtists">${data.saturday.secondary[4]}</span>` : ''}
                        ${data.saturday.secondary[5] ? `<span class="secondary saturdayArtists">${data.saturday.secondary[5]}</span>` : ''}
                        ${data.saturday.secondary[6] ? `<span class="secondary saturdayArtists">${data.saturday.secondary[6]}</span>` : ''}
                        ${data.saturday.secondary[7] ? `<span class="secondary saturdayArtists">${data.saturday.secondary[7]}</span>` : ''}
                        ${data.saturday.secondary[8] ? `<span class="secondary saturdayArtists">${data.saturday.secondary[8]}</span>` : ''}
                    </div>
                    <div class="headlinersCont saturdayContainer">
                        ${data.saturday.others[0] ? `<span class="others saturdayArtists">${data.saturday.others[0]}</span>` : ''}
                        ${data.saturday.others[1] ? `<span class="others saturdayArtists">${data.saturday.others[1]}</span>` : ''}
                        ${data.saturday.others[2] ? `<span class="others saturdayArtists">${data.saturday.others[2]}</span>` : ''}
                        ${data.saturday.others[3] ? `<span class="others saturdayArtists">${data.saturday.others[3]}</span>` : ''}
                        ${data.saturday.others[4] ? `<span class="others saturdayArtists">${data.saturday.others[4]}</span>` : ''}
                        ${data.saturday.others[5] ? `<span class="others saturdayArtists">${data.saturday.others[5]}</span>` : ''}
                        ${data.saturday.others[6] ? `<span class="others saturdayArtists">${data.saturday.others[6]}</span>` : ''}
                        ${data.saturday.others[7] ? `<span class="others saturdayArtists">${data.saturday.others[7]}</span>` : ''}
                        ${data.saturday.others[8] ? `<span class="others saturdayArtists">${data.saturday.others[8]}</span>` : ''}
                        ${data.saturday.others[9] ? `<span class="others saturdayArtists">${data.saturday.others[9]}</span>` : ''}
                        ${data.saturday.others[10] ? `<span class="others saturdayArtists">${data.saturday.others[10]}</span>` : ''}
                        ${data.saturday.others[11] ? `<span class="others saturdayArtists">${data.saturday.others[11]}</span>` : ''}
                        ${data.saturday.others[12] ? `<span class="others saturdayArtists">${data.saturday.others[12]}</span>` : ''}
                        ${data.saturday.others[13] ? `<span class="others saturdayArtists">${data.saturday.others[13]}</span>` : ''}
                        ${data.saturday.others[14] ? `<span class="others saturdayArtists">${data.saturday.others[14]}</span>` : ''}
                    </div>
                </div>`
            : ""}

            ${data.sunday.headliners.length != 0 || data.sunday.secondary.length != 0 || data.sunday.others.length != 0 ? 
                `<div class="posterContainer">
                    <span class="day sunday">SUNDAY</span>
                    <div class="headlinersCont">
                        ${data.sunday.headliners[0] ? `<span class="headliner fridayAndSundayArtists">${data.sunday.headliners[0]}</span>` : ''}
                        ${data.sunday.headliners[1] ? `<span class="headliner fridayAndSundayArtists">${data.sunday.headliners[1]}</span>` : ''}
                        ${data.sunday.headliners[2] ? `<span class="headliner fridayAndSundayArtists">${data.sunday.headliners[2]}</span>` : ''}
                    </div>
                    <div class="headlinersCont">
                        ${data.sunday.secondary[0] ? `<span class="secondary fridayAndSundayArtists">${data.sunday.secondary[0]}</span>` : ''}
                        ${data.sunday.secondary[1] ? `<span class="secondary fridayAndSundayArtists">${data.sunday.secondary[1]}</span>` : ''}
                        ${data.sunday.secondary[2] ? `<span class="secondary fridayAndSundayArtists">${data.sunday.secondary[2]}</span>` : ''}
                        ${data.sunday.secondary[3] ? `<span class="secondary fridayAndSundayArtists">${data.sunday.secondary[3]}</span>` : ''}
                        ${data.sunday.secondary[4] ? `<span class="secondary fridayAndSundayArtists">${data.sunday.secondary[4]}</span>` : ''}
                        ${data.sunday.secondary[5] ? `<span class="secondary fridayAndSundayArtists">${data.sunday.secondary[5]}</span>` : ''}
                        ${data.sunday.secondary[6] ? `<span class="secondary fridayAndSundayArtists">${data.sunday.secondary[6]}</span>` : ''}
                        ${data.sunday.secondary[7] ? `<span class="secondary fridayAndSundayArtists">${data.sunday.secondary[7]}</span>` : ''}
                        ${data.sunday.secondary[8] ? `<span class="secondary fridayAndSundayArtists">${data.sunday.secondary[8]}</span>` : ''}
                    </div>
                    <div class="headlinersCont">
                        ${data.sunday.others[0] ? `<span class="others fridayAndSundayArtists">${data.sunday.others[0]}</span>` : ''}
                        ${data.sunday.others[1] ? `<span class="others fridayAndSundayArtists">${data.sunday.others[1]}</span>` : ''}
                        ${data.sunday.others[2] ? `<span class="others fridayAndSundayArtists">${data.sunday.others[2]}</span>` : ''}
                        ${data.sunday.others[3] ? `<span class="others fridayAndSundayArtists">${data.sunday.others[3]}</span>` : ''}
                        ${data.sunday.others[4] ? `<span class="others fridayAndSundayArtists">${data.sunday.others[4]}</span>` : ''}
                        ${data.sunday.others[5] ? `<span class="others fridayAndSundayArtists">${data.sunday.others[5]}</span>` : ''}
                        ${data.sunday.others[6] ? `<span class="others fridayAndSundayArtists">${data.sunday.others[6]}</span>` : ''}
                        ${data.sunday.others[7] ? `<span class="others fridayAndSundayArtists">${data.sunday.others[7]}</span>` : ''}
                        ${data.sunday.others[8] ? `<span class="others fridayAndSundayArtists">${data.sunday.others[8]}</span>` : ''}
                        ${data.sunday.others[9] ? `<span class="others fridayAndSundayArtists">${data.sunday.others[9]}</span>` : ''}
                        ${data.sunday.others[10] ? `<span class="others fridayAndSundayArtists">${data.sunday.others[10]}</span>` : ''}
                        ${data.sunday.others[11] ? `<span class="others fridayAndSundayArtists">${data.sunday.others[11]}</span>` : ''}
                        ${data.sunday.others[12] ? `<span class="others fridayAndSundayArtists">${data.sunday.others[12]}</span>` : ''}
                        ${data.sunday.others[13] ? `<span class="others fridayAndSundayArtists">${data.sunday.others[13]}</span>` : ''}
                        ${data.sunday.others[14] ? `<span class="others fridayAndSundayArtists">${data.sunday.others[14]}</span>` : ''}
                    </div>
                </div>`
            : ""}
        </div>
    </body>
  </html>
    `

    if(themeSelected === "Lollapalooza"){
        poster = htmlData 
    } else {
        poster = fantasy01Html
    }
        
    nodeHtmlToImage({
        output: './image12.png',
        html: poster,
        quality: 100
    })
    .then(() => {
        console.log('The image was created successfully!')
        const imagePoster = fs.readFileSync('./image12.png');
        const base64ImagePoster = new Buffer.from(imagePoster).toString('base64');
        const file = 'data:image/jpeg;base64,' + base64ImagePoster

        res.json({ "message": "holis", "image": file} )
    })
    
})

app.listen(5000, () => {
	console.log(`Server is running on port 5000.`);
});