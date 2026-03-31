import Mock from 'mockjs'
// 初始数据
const initMenuList = [
  {
    "id": "08de3945-2576-481c-8f51-8b528a5b7ab4",
    "name": "",
    "title": "态势监控",
    "type": "",
    "hide": false,
    "remark": "",
    "menuIcon": "DataLine",
    "items": [
      {
        "id": "08de444f-7b10-4a7c-83a2-69349b01a476",
        "name": "home",
        "path": "/ygw/home",
        "component": "ygw/home",
        "menuIcon": "",
        "hide": false,
        "meta": {
          "title": "首页"
        },
        "items": [],
        "remark": ""
      },
      {
        "id": "08de3945-624a-4338-8f27-ac233e71620a",
        "name": "",
        "path": "",
        "component": "",
        "menuIcon": "",
        "hide": false,
        "meta": {
          "title": "ADP"
        },
        "items": [
          {
            "id": "08de435c-def3-49f3-8c1f-cd0f527d7ecc",
            "name": "query",
            "path": "/ygw/query",
            "component": "views/adp/query/index",
            "menuIcon": "",
            "hide": true,
            "meta": {
              "title": "ADP查询"
            },
            "items": [],
            "remark": ""
          },
          {
            "id": "08de435c-c689-40de-803a-90934c3312b3",
            "name": "list",
            "path": "/ygw/list",
            "component": "views/adp/list/index",
            "menuIcon": "AddLocation",
            "hide": false,
            "meta": {
              "title": "ADP录入"
            },
            "items": [],
            "remark": "123"
          },
          {
            "id": "08de4cee-bab3-4f09-8f45-6610adf0527f",
            "name": "monitor",
            "path": "/ygw/monitor",
            "component": "ygw/monitor",
            "menuIcon": "",
            "hide": false,
            "meta": {
              "title": "ADP执行监控"
            },
            "items": [],
            "remark": ""
          }
        ],
        "remark": ""
      },
      {
        "id": "08de3945-81f5-4ce0-8f5c-068aa77a437e",
        "name": "map",
        "path": "/ygw/map",
        "component": "view/map/index",
        "menuIcon": "Avatar",
        "hide": false,
        "meta": {
          "title": "场监"
        },
        "items": [],
        "remark": ""
      },
      {
        "id": "08de3946-1a7c-4b12-83e4-ea8d5f23756c",
        "name": "",
        "path": "/oms/track?isCalc=1",
        "component": "",
        "menuIcon": "",
        "hide": true,
        "meta": {
          "title": "空中"
        },
        "items": [],
        "remark": "1"
      },
      {
        "id": "08de3946-3147-4d3a-8413-b3164668d785",
        "name": "",
        "path": "/oms/display/flightInfo?kind=normal",
        "component": "",
        "menuIcon": "",
        "hide": false,
        "meta": {
          "title": "航班动态"
        },
        "items": [],
        "remark": ""
      }
    ]
  },
  {
    "id": "08de3ec2-58aa-4a0e-8812-265838d91e37",
    "name": "",
    "title": "值班管理",
    "type": "",
    "hide": false,
    "remark": "",
    "menuIcon": "AlarmClock",
    "items": [
      {
        "id": "08de3ec2-6a97-4453-8131-669e703453ed",
        "name": "",
        "path": "",
        "component": "",
        "menuIcon": "",
        "hide": false,
        "meta": {
          "title": "值班管理"
        },
        "items": [
          {
            "id": "10a0a499-2441-11ed-b770-fefcfe485cc3",
            "name": "",
            "path": "/oms/changeShift",
            "component": "",
            "menuIcon": "",
            "hide": false,
            "meta": {
              "title": "席位交接班"
            },
            "items": [],
            "remark": ""
          },
          {
            "id": "563bbb37-2441-11ed-b770-fefcfe485cc3",
            "name": "",
            "path": "/oms/dutyQuery",
            "component": "",
            "menuIcon": "",
            "hide": false,
            "meta": {
              "title": "值班信息查询统计"
            },
            "items": [],
            "remark": ""
          }
        ],
        "remark": ""
      },
      {
        "id": "8ceb6413-243b-11ed-b770-fefcfe485cc3",
        "name": "",
        "path": "",
        "component": "",
        "menuIcon": "",
        "hide": false,
        "meta": {
          "title": "岗前排班"
        },
        "items": [
          {
            "id": "57d6052f-2ce3-11ed-b770-fefcfe485cc3",
            "name": "",
            "path": "",
            "component": "",
            "menuIcon": "",
            "hide": false,
            "meta": {
              "title": "基础数据"
            },
            "items": [
              {
                "id": "d4c11c40-2ce3-11ed-b770-fefcfe485cc3",
                "name": "",
                "path": "/oms/scheduleTeam",
                "component": "",
                "menuIcon": "",
                "hide": false,
                "meta": {
                  "title": "人员分组模板"
                },
                "items": [],
                "remark": ""
              },
              {
                "id": "166a679e-2ce4-11ed-b770-fefcfe485cc3",
                "name": "",
                "path": "/oms/scheduleRole",
                "component": "",
                "menuIcon": "",
                "hide": false,
                "meta": {
                  "title": "角色模板"
                },
                "items": [],
                "remark": ""
              },
              {
                "id": "acda4c74-2ce4-11ed-b770-fefcfe485cc3",
                "name": "",
                "path": "/oms/scheduleSeat",
                "component": "",
                "menuIcon": "",
                "hide": false,
                "meta": {
                  "title": "席位模板"
                },
                "items": [],
                "remark": ""
              },
              {
                "id": "cbbae6f3-2ce4-11ed-b770-fefcfe485cc3",
                "name": "",
                "path": "/oms/scheduleShift",
                "component": "",
                "menuIcon": "",
                "hide": false,
                "meta": {
                  "title": "班次模板"
                },
                "items": [],
                "remark": ""
              }
            ],
            "remark": ""
          },
          {
            "id": "31ebd558-34bf-11ed-b770-fefcfe485cc3",
            "name": "",
            "path": "/oms/scheduleTemplate",
            "component": "",
            "menuIcon": "",
            "hide": false,
            "meta": {
              "title": "排班模板配置"
            },
            "items": [],
            "remark": ""
          },
          {
            "id": "5ab7f66b-34bf-11ed-b770-fefcfe485cc3",
            "name": "",
            "path": "/oms/schedule",
            "component": "",
            "menuIcon": "",
            "hide": false,
            "meta": {
              "title": "排班"
            },
            "items": [],
            "remark": ""
          },
          {
            "id": "f05fcc23-ead8-11f0-a34d-fefcfe51407a",
            "name": "",
            "path": "/oms/scheduleUser",
            "component": "",
            "menuIcon": "",
            "hide": false,
            "meta": {
              "title": "查看排班"
            },
            "items": [],
            "remark": ""
          },
          {
            "id": "9ab7fe01-37c6-11ed-b770-fefcfe485cc3",
            "name": "",
            "path": "",
            "component": "",
            "menuIcon": "",
            "hide": false,
            "meta": {
              "title": "替换班管理"
            },
            "items": [
              {
                "id": "733ceb4c-37c9-11ed-b770-fefcfe485cc3",
                "name": "",
                "path": "/oms/replacementApply",
                "component": "",
                "menuIcon": "",
                "hide": false,
                "meta": {
                  "title": "替换班申请"
                },
                "items": [],
                "remark": ""
              },
              {
                "id": "99d9b056-37c9-11ed-b770-fefcfe485cc3",
                "name": "",
                "path": "/oms/replacementAudit",
                "component": "",
                "menuIcon": "",
                "hide": false,
                "meta": {
                  "title": "替换班审批"
                },
                "items": [],
                "remark": ""
              }
            ],
            "remark": ""
          }
        ],
        "remark": ""
      }
    ]
  },
  {
    "id": "08de3ec3-acf2-4b9c-8771-2a1452a592d5",
    "name": "",
    "title": "文档管理",
    "type": "",
    "hide": false,
    "remark": "",
    "menuIcon": "Document",
    "items": [
      {
        "id": "08de3ec3-bbba-484d-8242-40f8919ab430",
        "name": "",
        "path": "",
        "component": "",
        "menuIcon": "",
        "hide": false,
        "meta": {
          "title": "工作日志"
        },
        "items": [
          {
            "id": "08de4741-b2d5-402e-86ef-c083a4a0f9e1",
            "name": "dailyLog",
            "path": "/ygw/dailyLog",
            "component": "view/DutyLog/dailyLog",
            "menuIcon": "",
            "hide": false,
            "meta": {
              "title": "日志"
            },
            "items": [],
            "remark": ""
          },
          {
            "id": "08de4741-fc07-4061-84ec-29bea2c14391",
            "name": "historyLogs",
            "path": "/ygw/historyLogs",
            "component": "view/DutyLog/historyLogs",
            "menuIcon": "",
            "hide": false,
            "meta": {
              "title": "历史日志"
            },
            "items": [],
            "remark": ""
          }
        ],
        "remark": ""
      }
    ]
  },
  {
    "id": "2bb9ddef-9e12-11ee-be15-fefcfe485cc3",
    "name": "",
    "title": "气象信息显示",
    "type": "",
    "hide": false,
    "remark": "",
    "menuIcon": "Cloudy",
    "items": [
      {
        "id": "0fc60d3b-9e15-11ee-be15-fefcfe485cc3",
        "name": "",
        "path": "",
        "component": "",
        "menuIcon": "",
        "hide": false,
        "meta": {
          "title": "天气形势"
        },
        "items": [
          {
            "id": "02873480-9e19-11ee-be15-fefcfe485cc3",
            "name": "",
            "path": "/oms/display/weatherInfo?url=%2Fbiz%2FWeatherForecast%2FMR.aspx",
            "component": "",
            "menuIcon": "",
            "hide": false,
            "meta": {
              "title": "MDRS天气概率"
            },
            "items": [],
            "remark": ""
          },
          {
            "id": "02826d88-9e19-11ee-be15-fefcfe485cc3",
            "name": "",
            "path": "/oms/display/weatherInfo?url=%2Fbiz%2FZGGG%2Fzggg_forecast.asp",
            "component": "",
            "menuIcon": "",
            "hide": false,
            "meta": {
              "title": "中南天气形势"
            },
            "items": [],
            "remark": ""
          },
          {
            "id": "027ed29d-9e19-11ee-be15-fefcfe485cc3",
            "name": "",
            "path": "/oms/display/weatherInfo?url=%2Fbiz%2FWeatherForecast%2FWT.aspx",
            "component": "",
            "menuIcon": "",
            "hide": false,
            "meta": {
              "title": "天气通报"
            },
            "items": [],
            "remark": ""
          },
          {
            "id": "027c06b0-9e19-11ee-be15-fefcfe485cc3",
            "name": "",
            "path": "/oms/display/weatherInfo?url=%2Fbiz%2FWeatherForecast%2FKB.aspx",
            "component": "",
            "menuIcon": "",
            "hide": false,
            "meta": {
              "title": "天气快报"
            },
            "items": [],
            "remark": ""
          },
          {
            "id": "607af644-c374-11ef-a793-fefcfe485cc3",
            "name": "",
            "path": "/oms/display/weatherInfo?url=%2Fbiz%2Fforecast%2Fgetdata.aspx%3Ffn%3Dweek_fcst.html",
            "component": "",
            "menuIcon": "",
            "hide": false,
            "meta": {
              "title": "白云机场一周天气预报"
            },
            "items": [],
            "remark": ""
          }
        ],
        "remark": ""
      },
      {
        "id": "39587c02-9e13-11ee-be15-fefcfe485cc3",
        "name": "",
        "path": "",
        "component": "",
        "menuIcon": "",
        "hide": false,
        "meta": {
          "title": "图形产品"
        },
        "items": [
          {
            "id": "b16cdd5d-9e12-11ee-be15-fefcfe485cc3",
            "name": "",
            "path": "/oms/display/weatherInfo?url=%2Fbiz%2FAWOS%2Fawos_all.aspx",
            "component": "",
            "menuIcon": "",
            "hide": false,
            "meta": {
              "title": "AWOS"
            },
            "items": [],
            "remark": ""
          },
          {
            "id": "02552213-9e19-11ee-be15-fefcfe485cc3",
            "name": "",
            "path": "/oms/display/weatherInfo?url=%2Fbiz%2FRadar%2FRadarZN.aspx?",
            "component": "",
            "menuIcon": "",
            "hide": false,
            "meta": {
              "title": "中南地区雷达"
            },
            "items": [],
            "remark": ""
          },
          {
            "id": "025852f1-9e19-11ee-be15-fefcfe485cc3",
            "name": "",
            "path": "/oms/display/weatherInfo?url=%2Fbiz%2FRadar%2FRadar.aspx",
            "component": "",
            "menuIcon": "",
            "hide": false,
            "meta": {
              "title": "全国雷达拼图"
            },
            "items": [],
            "remark": ""
          },
          {
            "id": "0fb326c9-9e15-11ee-be15-fefcfe485cc3",
            "name": "",
            "path": "/oms/display/weatherInfo?url=%2Fbiz%2FZGGGFY2E%2FFY2H.aspx",
            "component": "",
            "menuIcon": "",
            "hide": false,
            "meta": {
              "title": "FY2H卫星"
            },
            "items": [],
            "remark": ""
          },
          {
            "id": "0fc3753b-9e15-11ee-be15-fefcfe485cc3",
            "name": "",
            "path": "/oms/display/weatherInfo?url=%2Fbiz%2Ftyphoon%2Findex.html",
            "component": "",
            "menuIcon": "",
            "hide": false,
            "meta": {
              "title": "台风路径图"
            },
            "items": [],
            "remark": ""
          }
        ],
        "remark": ""
      },
      {
        "id": "0fb854bb-9e15-11ee-be15-fefcfe485cc3",
        "name": "",
        "path": "",
        "component": "",
        "menuIcon": "",
        "hide": false,
        "meta": {
          "title": "预告图"
        },
        "items": [
          {
            "id": "025b662c-9e19-11ee-be15-fefcfe485cc3",
            "name": "",
            "path": "/oms/display/weatherInfo?url=%2Fbiz%2FSigWxCharts_FL100%2Findex.htm",
            "component": "",
            "menuIcon": "",
            "hide": false,
            "meta": {
              "title": "低空天气预告图"
            },
            "items": [],
            "remark": ""
          },
          {
            "id": "025e44d0-9e19-11ee-be15-fefcfe485cc3",
            "name": "",
            "path": "/oms/display/weatherInfo?url=%2Fbiz%2FSigWxCharts%2Findex.htm",
            "component": "",
            "menuIcon": "",
            "hide": false,
            "meta": {
              "title": "中高空天气预告图"
            },
            "items": [],
            "remark": ""
          },
          {
            "id": "02611b67-9e19-11ee-be15-fefcfe485cc3",
            "name": "",
            "path": "/oms/display/weatherInfo?url=%2Fbiz%2FWindTempCharts_Low%2Findex.htm",
            "component": "",
            "menuIcon": "",
            "hide": false,
            "meta": {
              "title": "低层风温预告图"
            },
            "items": [],
            "remark": ""
          },
          {
            "id": "0263def0-9e19-11ee-be15-fefcfe485cc3",
            "name": "",
            "path": "/oms/display/weatherInfo?url=%2Fbiz%2FWindTempCharts%2Findex.htm",
            "component": "",
            "menuIcon": "",
            "hide": false,
            "meta": {
              "title": "中高层风温预告图"
            },
            "items": [],
            "remark": ""
          }
        ],
        "remark": ""
      },
      {
        "id": "0fbcef90-9e15-11ee-be15-fefcfe485cc3",
        "name": "",
        "path": "",
        "component": "",
        "menuIcon": "",
        "hide": false,
        "meta": {
          "title": "气象情报"
        },
        "items": [
          {
            "id": "9225f5e9-9e19-11ee-be15-fefcfe485cc3",
            "name": "",
            "path": "/oms/display/weatherInfo?url=%2Fbiz%2FHistory%2Fsigmet%2FSIGMET.aspx",
            "component": "",
            "menuIcon": "",
            "hide": false,
            "meta": {
              "title": "境内重要天气情报"
            },
            "items": [],
            "remark": ""
          },
          {
            "id": "9228ed03-9e19-11ee-be15-fefcfe485cc3",
            "name": "",
            "path": "/oms/display/weatherInfo?url=%2Fbiz%2FHistory%2Fsigmet%2FSIGMET_FOREIGN.aspx",
            "component": "",
            "menuIcon": "",
            "hide": false,
            "meta": {
              "title": "境外重要天气情报"
            },
            "items": [],
            "remark": ""
          },
          {
            "id": "0269ee87-9e19-11ee-be15-fefcfe485cc3",
            "name": "",
            "path": "/oms/display/weatherInfo?url=%2Fbiz%2FQueryMetInfo%2FReportByArea.aspx",
            "component": "",
            "menuIcon": "",
            "hide": false,
            "meta": {
              "title": "机场报文"
            },
            "items": [],
            "remark": ""
          },
          {
            "id": "0fbfac3b-9e15-11ee-be15-fefcfe485cc3",
            "name": "",
            "path": "/oms/display/weatherInfo?url=%2Fbiz%2FNoticePrd%2FNoticePrd.aspx",
            "component": "",
            "menuIcon": "",
            "hide": false,
            "meta": {
              "title": "预警预报"
            },
            "items": [],
            "remark": ""
          },
          {
            "id": "026d7ce8-9e19-11ee-be15-fefcfe485cc3",
            "name": "",
            "path": "/oms/display/weatherInfo?url=%2Fbiz%2Fwarn%2Flist_sp.aspx",
            "component": "",
            "menuIcon": "",
            "hide": false,
            "meta": {
              "title": "Sp告警"
            },
            "items": [],
            "remark": ""
          },
          {
            "id": "0271275b-9e19-11ee-be15-fefcfe485cc3",
            "name": "",
            "path": "/oms/display/weatherInfo?url=%2Fbiz%2Fwarn%2Flist_sigmet.aspx",
            "component": "",
            "menuIcon": "",
            "hide": false,
            "meta": {
              "title": "Sigmet告警"
            },
            "items": [],
            "remark": ""
          },
          {
            "id": "02742270-9e19-11ee-be15-fefcfe485cc3",
            "name": "",
            "path": "/oms/display/weatherInfo?url=%2Fbiz%2Fwarn%2Flist_bbb.aspx",
            "component": "",
            "menuIcon": "",
            "hide": false,
            "meta": {
              "title": "修订报告警"
            },
            "items": [],
            "remark": ""
          },
          {
            "id": "027793be-9e19-11ee-be15-fefcfe485cc3",
            "name": "",
            "path": "/oms/display/weatherInfo?url=%2Fbiz%2Fwarn%2Flist_sigwx.aspx",
            "component": "",
            "menuIcon": "",
            "hide": false,
            "meta": {
              "title": "修订图告警"
            },
            "items": [],
            "remark": ""
          }
        ],
        "remark": ""
      }
    ]
  },
  {
    "id": "08de3946-5e20-4768-8795-7b14ab38f7a9",
    "name": "",
    "title": "系统设置",
    "type": "main",
    "hide": false,
    "remark": "",
    "menuIcon": "Setting",
    "items": [
      {
        "id": "08de3946-987e-41c2-8511-0a66598f8bc4",
        "name": "permission",
        "path": "/system/permission",
        "component": "",
        "menuIcon": "",
        "hide": false,
        "meta": {
          "title": "菜单管理"
        },
        "items": [],
        "remark": ""
      },
      {
        "id": "08de41ca-1962-4b56-8fea-cb520576ddbe",
        "name": "role",
        "path": "/system/role",
        "component": "system/role",
        "menuIcon": "",
        "hide": false,
        "meta": {
          "title": "角色管理"
        },
        "items": [],
        "remark": ""
      },
      {
        "id": "08de41ca-27cd-4ae0-83ba-57042cd1cd7d",
        "name": "user",
        "path": "/system/user",
        "component": "system/user",
        "menuIcon": "",
        "hide": false,
        "meta": {
          "title": "用户管理"
        },
        "items": [],
        "remark": ""
      },
      {
        "id": "08de41ee-799d-4fa4-8936-77b0c0018824",
        "name": "button",
        "path": "/system/button",
        "component": "system/button",
        "menuIcon": "",
        "hide": false,
        "meta": {
          "title": "按钮管理"
        },
        "items": [],
        "remark": ""
      }
    ]
  }
]

const permission = initMenuList
// 模拟用户数据
const users = Mock.mock({
  permission
})

// 从 localStorage 获取数据，如果没有则使用初始数据
const getMenuList = () => {
  const stored = localStorage.getItem('mock_menuList')
  return stored ? JSON.parse(stored) : [...initMenuList]
}

// 保存数据到 localStorage
const saveMenuList = (list) => {
  localStorage.setItem('mock_menuList', JSON.stringify(list))
}

// 初始化
let menuList = getMenuList()
// 拦截请求，并返回模拟数据
// 需要匹配完整的URL路径，包括baseURL
Mock.mock('http://localhost:3000/api/permission', 'get', () => {
  return users
})
// 查询列表
Mock.mock('http://localhost:3000/api/Menu/command-sys-menu/list', 'post', (options) => {
  const data = options.body ? JSON.parse(options.body) : {}
  console.log('查询参数:', data)
  return {
    data: {
      items: menuList
    }
  }
})

// 新增
Mock.mock('http://localhost:3000/api/Menu/command-sys-menu', 'post', (options) => {
  const data = JSON.parse(options.body)
  console.log('新增数据:', data)
  // 生成新 id (UUID 格式)
  const newId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
  const newItem = { ...data, id: newId }
  menuList.push(newItem)
  saveMenuList(menuList)
  return { code: 200, message: '新增成功', data: newItem }
})

// 修改 - 使用正则匹配动态 id
Mock.mock(/\/api\/Menu\/command-sys-menu\/[\w-]+/, 'put', (options) => {
  const id = options.url.match(/\/command-sys-menu\/([\w-]+)/)[1]
  const data = JSON.parse(options.body)
  console.log('修改 id:', id, '数据:', data)
  // 更新数据
  const index = menuList.findIndex(item => item.id == id)
  if (index !== -1) {
    menuList[index] = { ...menuList[index], ...data }
    saveMenuList(menuList)
  }
  return { code: 200, message: '修改成功' }
})

// 删除 - 使用正则匹配动态 id
Mock.mock(/\/api\/Menu\/command-sys-menu\/[\w-]+/, 'delete', (options) => {
  const id = options.url.match(/\/command-sys-menu\/([\w-]+)/)[1]
  console.log('删除 id:', id)
  // 删除数据
  menuList = menuList.filter(item => item.id != id)
  saveMenuList(menuList)
  return { code: 200, message: '删除成功' }
})

// ==================== 角色管理 Mock ====================

// 将 permission 树形结构扁平化为列表
const flattenPermission = (items, parentId = null) => {
  let result = []
  items.forEach(item => {
    const flatItem = {
      id: item.id,
      parentId: parentId,
      menuName: item.title || item.meta?.title || '',
      menuUrl: item.path || '',
      permissionUrl: item.path || ''
    }
    result.push(flatItem)
    if (item.items && item.items.length > 0) {
      result = result.concat(flattenPermission(item.items, item.id))
    }
  })
  return result
}

// 扁平化后的权限菜单列表
const flatPermissionList = flattenPermission(permission)

// 获取权限菜单列表（用于角色权限设置）
Mock.mock('http://localhost:3000/api/Menu/permission-list', 'post', () => {
  return {
    code: 200,
    message: '查询成功',
    data: {
      items: flatPermissionList
    }
  }
})

// 角色初始数据
const initRoleList = [
  {
    id: 'role-001',
    roleName: '超级管理员',
    roleCode: 1,
    remark: '拥有所有权限',
    permissions: ['b6ae6118-3cee-11ef-a793-fefcfe485cc3', '9228ed03-9e19-11ee-be15-fefcfe485cc3', '9225f5e9-9e19-11ee-be15-fefcfe485cc3', '607af644-c374-11ef-a793-fefcfe485cc3', '39587c02-9e13-11ee-be15-fefcfe485cc3', '2bb9ddef-9e12-11ee-be15-fefcfe485cc3']
  },
  {
    id: 'role-002',
    roleName: '普通用户',
    roleCode: 2,
    remark: '普通用户权限',
    permissions: ['607af644-c374-11ef-a793-fefcfe485cc3', '39587c02-9e13-11ee-be15-fefcfe485cc3']
  },
  {
    id: 'role-003',
    roleName: '访客',
    roleCode: 3,
    remark: '只读权限',
    permissions: ['39587c02-9e13-11ee-be15-fefcfe485cc3']
  },
  {
    id: 'role-004',
    roleName: 3,
    roleCode: 4,
    remark: '负责系统运维',
    permissions: ['607af644-c374-11ef-a793-fefcfe485cc3']
  },
  {
    id: 'role-005',
    roleName: 6,
    roleCode: 'DATA_ANALYST',
    remark: '数据查看和分析权限',
    permissions: ['39587c02-9e13-11ee-be15-fefcfe485cc3', '2bb9ddef-9e12-11ee-be15-fefcfe485cc3']
  },
  {
    id: 'role-006',
    roleName: '值班主管',
    roleCode: 8,
    remark: '值班管理权限',
    permissions: ['607af644-c374-11ef-a793-fefcfe485cc3', '39587c02-9e13-11ee-be15-fefcfe485cc3']
  },
  {
    id: 'role-007',
    roleName: '气象员',
    roleCode: 9,
    remark: '气象信息查看权限',
    permissions: ['2bb9ddef-9e12-11ee-be15-fefcfe485cc3']
  },
  {
    id: 'role-008',
    roleName: '调度员',
    roleCode: 'DISPATCHER',
    remark: '航班调度权限',
    permissions: ['607af644-c374-11ef-a793-fefcfe485cc3']
  },
  {
    id: 'role-009',
    roleName: '安全员',
    roleCode: 'SECURITY_STAFF',
    remark: '安全检查权限',
    permissions: ['39587c02-9e13-11ee-be15-fefcfe485cc3']
  },
  {
    id: 'role-010',
    roleName: '培训管理员',
    roleCode: 'TRAINING_ADMIN',
    remark: '培训管理权限',
    permissions: ['607af644-c374-11ef-a793-fefcfe485cc3']
  },
  {
    id: 'role-011',
    roleName: '设备管理员',
    roleCode: 'DEVICE_ADMIN',
    remark: '设备管理权限',
    permissions: ['39587c02-9e13-11ee-be15-fefcfe485cc3']
  },
  {
    id: 'role-012',
    roleName: '文档管理员',
    roleCode: 'DOC_ADMIN',
    remark: '文档管理权限',
    permissions: ['607af644-c374-11ef-a793-fefcfe485cc3']
  },
  {
    id: 'role-013',
    roleName: '审计员',
    roleCode: 'AUDITOR',
    remark: '系统审计权限',
    permissions: ['2bb9ddef-9e12-11ee-be15-fefcfe485cc3']
  },
  {
    id: 'role-014',
    roleName: '报表管理员',
    roleCode: 'REPORT_ADMIN',
    remark: '报表管理权限',
    permissions: ['39587c02-9e13-11ee-be15-fefcfe485cc3']
  },
  {
    id: 'role-015',
    roleName: '系统管理员',
    roleCode: 'SYS_ADMIN',
    remark: '系统配置权限',
    permissions: ['b6ae6118-3cee-11ef-a793-fefcfe485cc3', '9228ed03-9e19-11ee-be15-fefcfe485cc3']
  },
  {
    id: 'role-016',
    roleName: '通信管理员',
    roleCode: 'COMM_ADMIN',
    remark: '通信设备管理权限',
    permissions: ['607af644-c374-11ef-a793-fefcfe485cc3']
  },
  {
    id: 'role-017',
    roleName: '航务员',
    roleCode: 'FLIGHT_OPS',
    remark: '航务操作权限',
    permissions: ['39587c02-9e13-11ee-be15-fefcfe485cc3']
  },
  {
    id: 'role-018',
    roleName: '机务员',
    roleCode: 'MAINTENANCE',
    remark: '机务维护权限',
    permissions: ['607af644-c374-11ef-a793-fefcfe485cc3']
  },
  {
    id: 'role-019',
    roleName: '签派员',
    roleCode: 'FLIGHT_DISPATCH',
    remark: '签派权限',
    permissions: ['2bb9ddef-9e12-11ee-be15-fefcfe485cc3']
  },
  {
    id: 'role-020',
    roleName: '塔台管制员',
    roleCode: 'TOWER_CONTROLLER',
    remark: '塔台管制权限',
    permissions: ['b6ae6118-3cee-11ef-a793-fefcfe485cc3', '607af644-c374-11ef-a793-fefcfe485cc3']
  },
  {
    id: 'role-021',
    roleName: '进近管制员',
    roleCode: 'APPROACH_CONTROLLER',
    remark: '进近管制权限',
    permissions: ['39587c02-9e13-11ee-be15-fefcfe485cc3']
  },
  {
    id: 'role-022',
    roleName: '区调管制员',
    roleCode: 'AREA_CONTROLLER',
    remark: '区域管制权限',
    permissions: ['607af644-c374-11ef-a793-fefcfe485cc3']
  },
  {
    id: 'role-023',
    roleName: '情报员',
    roleCode: 'INFO_STAFF',
    remark: '情报服务权限',
    permissions: ['2bb9ddef-9e12-11ee-be15-fefcfe485cc3']
  },
  {
    id: 'role-024',
    roleName: '流量管理员',
    roleCode: 'FLOW_MANAGER',
    remark: '流量管理权限',
    permissions: ['39587c02-9e13-11ee-be15-fefcfe485cc3']
  },
  {
    id: 'role-025',
    roleName: '应急管理员',
    roleCode: 'EMERGENCY_ADMIN',
    remark: '应急处置权限',
    permissions: ['b6ae6118-3cee-11ef-a793-fefcfe485cc3', '607af644-c374-11ef-a793-fefcfe485cc3', '39587c02-9e13-11ee-be15-fefcfe485cc3']
  }
]

// 从 localStorage 获取角色数据
const getRoleList = () => {
  const stored = localStorage.getItem('mock_roleList')
  return stored ? JSON.parse(stored) : [...initRoleList]
}

// 保存角色数据到 localStorage
const saveRoleList = (list) => {
  localStorage.setItem('mock_roleList', JSON.stringify(list))
}

// 初始化角色列表
let roleList = getRoleList()

// 查询角色列表（支持分页）
Mock.mock('http://localhost:3000/api/Role/command-sys-role/list', 'post', (options) => {
  const data = options.body ? JSON.parse(options.body) : {}
  const { pageIndex = 1, pageSize = 10 } = data

  // 计算分页
  const start = (pageIndex - 1) * pageSize
  const end = start + pageSize
  const pagedItems = roleList.slice(start, end)

  console.log('角色列表查询参数:', data, '返回数据:', pagedItems.length, '条')

  return {
    code: 200,
    message: '查询成功',
    data: {
      items: pagedItems,
      totalCount: roleList.length
    }
  }
})

// 新增角色
Mock.mock('http://localhost:3000/api/Role/command-sys-role', 'post', (options) => {
  const data = JSON.parse(options.body)
  const newId = 'role-' + Date.now()
  const newItem = { ...data, id: newId, permissions: [] }
  roleList.push(newItem)
  saveRoleList(roleList)
  return { code: 200, message: '新增成功', data: newItem }
})

// 修改角色
Mock.mock(/\/api\/Role\/command-sys-role\/[\w-]+$/, 'put', (options) => {
  const id = options.url.match(/\/command-sys-role\/([\w-]+)$/)[1]
  const data = JSON.parse(options.body)
  const index = roleList.findIndex(item => item.id === id)
  if (index !== -1) {
    roleList[index] = { ...roleList[index], ...data }
    saveRoleList(roleList)
  }
  return { code: 200, message: '修改成功' }
})

// 删除角色
Mock.mock(/\/api\/Role\/command-sys-role\/[\w-]+$/, 'delete', (options) => {
  const id = options.url.match(/\/command-sys-role\/([\w-]+)$/)[1]
  roleList = roleList.filter(item => item.id !== id)
  saveRoleList(roleList)
  return { code: 200, message: '删除成功' }
})

// 获取角色权限
Mock.mock(/\/api\/Role\/command-sys-role\/[\w-]+\/permissions$/, 'get', (options) => {
  const id = options.url.match(/\/command-sys-role\/([\w-]+)\/permissions$/)[1]
  const role = roleList.find(item => item.id === id)
  const permissions = role?.permissions || []
  // 返回权限ID对应的菜单项（从 flatPermissionList 获取）
  const permissionItems = flatPermissionList.filter(menu => permissions.includes(menu.id))
  return {
    code: 200,
    message: '查询成功',
    data: {
      items: permissionItems
    }
  }
})

// 保存角色权限
Mock.mock(/\/api\/Role\/command-sys-role\/[\w-]+\/permissions$/, 'post', (options) => {
  const id = options.url.match(/\/command-sys-role\/([\w-]+)\/permissions$/)[1]
  const data = JSON.parse(options.body)
  const index = roleList.findIndex(item => item.id === id)
  if (index !== -1) {
    roleList[index].permissions = data.permissionIds || []
    saveRoleList(roleList)
  }
  return { code: 200, message: '保存成功' }
})

// ==================== 用户管理 Mock ====================

// 用户初始数据
const initUserList = [
  {
    id: 'user-001',
    username: 'admin',
    realName: '系统管理员',
    email: 'admin@example.com',
    phone: '13800138000',
    status: 1,
    roles: ['role-001']
  },
  {
    id: 'user-002',
    username: 'zhangsan',
    realName: '张三',
    email: 'zhangsan@example.com',
    phone: '13800138001',
    status: 1,
    roles: ['role-002', 'role-007']
  },
  {
    id: 'user-003',
    username: 'lisi',
    realName: '李四',
    email: 'lisi@example.com',
    phone: '13800138002',
    status: 1,
    roles: ['role-003']
  },
  {
    id: 'user-004',
    username: 'wangwu',
    realName: '王五',
    email: 'wangwu@example.com',
    phone: '13800138003',
    status: 0,
    roles: ['role-004']
  },
  {
    id: 'user-005',
    username: 'zhaoliu',
    realName: '赵六',
    email: 'zhaoliu@example.com',
    phone: '13800138004',
    status: 1,
    roles: ['role-005']
  },
  {
    id: 'user-006',
    username: 'sunqi',
    realName: '孙七',
    email: 'sunqi@example.com',
    phone: '13800138005',
    status: 1,
    roles: ['role-006', 'role-008']
  },
  {
    id: 'user-007',
    username: 'zhouba',
    realName: '周八',
    email: 'zhouba@example.com',
    phone: '13800138006',
    status: 1,
    roles: ['role-007']
  },
  {
    id: 'user-008',
    username: 'wujiu',
    realName: '吴九',
    email: 'wujiu@example.com',
    phone: '13800138007',
    status: 0,
    roles: ['role-009']
  },
  {
    id: 'user-009',
    username: 'zhengshi',
    realName: '郑十',
    email: 'zhengshi@example.com',
    phone: '13800138008',
    status: 1,
    roles: ['role-010']
  },
  {
    id: 'user-010',
    username: 'chenyi',
    realName: '陈一',
    email: 'chenyi@example.com',
    phone: '13800138009',
    status: 1,
    roles: ['role-011']
  },
  {
    id: 'user-011',
    username: 'huanger',
    realName: '黄二',
    email: 'huanger@example.com',
    phone: '13800138010',
    status: 1,
    roles: ['role-012']
  },
  {
    id: 'user-012',
    username: 'linsan',
    realName: '林三',
    email: 'linsan@example.com',
    phone: '13800138011',
    status: 1,
    roles: ['role-013']
  }
]

// 从 localStorage 获取用户数据
const getUserList = () => {
  const stored = localStorage.getItem('mock_userList')
  return stored ? JSON.parse(stored) : [...initUserList]
}

// 保存用户数据到 localStorage
const saveUserList = (list) => {
  localStorage.setItem('mock_userList', JSON.stringify(list))
}

// 初始化用户列表
let userList = getUserList()

// 查询用户列表（支持分页）
Mock.mock('http://localhost:3000/api/User/command-sys-user/list', 'post', (options) => {
  const data = options.body ? JSON.parse(options.body) : {}
  const { pageIndex = 1, pageSize = 10 } = data

  // 计算分页
  const start = (pageIndex - 1) * pageSize
  const end = start + pageSize
  const pagedItems = userList.slice(start, end)

  console.log('用户列表查询参数:', data, '返回数据:', pagedItems.length, '条')

  return {
    code: 200,
    message: '查询成功',
    data: {
      items: pagedItems,
      totalCount: userList.length
    }
  }
})

// 新增用户
Mock.mock('http://localhost:3000/api/User/command-sys-user', 'post', (options) => {
  const data = JSON.parse(options.body)
  const newId = 'user-' + Date.now()
  const newItem = { ...data, id: newId, roles: [] }
  userList.push(newItem)
  saveUserList(userList)
  return { code: 200, message: '新增成功', data: newItem }
})

// 修改用户
Mock.mock(/\/api\/User\/command-sys-user\/[\w-]+$/, 'put', (options) => {
  const id = options.url.match(/\/command-sys-user\/([\w-]+)$/)[1]
  const data = JSON.parse(options.body)
  const index = userList.findIndex(item => item.id === id)
  if (index !== -1) {
    userList[index] = { ...userList[index], ...data }
    saveUserList(userList)
  }
  return { code: 200, message: '修改成功' }
})

// 删除用户
Mock.mock(/\/api\/User\/command-sys-user\/[\w-]+$/, 'delete', (options) => {
  const id = options.url.match(/\/command-sys-user\/([\w-]+)$/)[1]
  userList = userList.filter(item => item.id !== id)
  saveUserList(userList)
  return { code: 200, message: '删除成功' }
})

// 获取用户角色
Mock.mock(/\/api\/User\/command-sys-user\/[\w-]+\/roles$/, 'get', (options) => {
  const id = options.url.match(/\/command-sys-user\/([\w-]+)\/roles$/)[1]
  const user = userList.find(item => item.id === id)
  const userRoleIds = user?.roles || []
  // 返回角色ID对应的角色项
  const roleItems = roleList.filter(role => userRoleIds.includes(role.id))
  return {
    code: 200,
    message: '查询成功',
    data: {
      items: roleItems
    }
  }
})

// 保存用户角色
Mock.mock(/\/api\/User\/command-sys-user\/[\w-]+\/roles$/, 'post', (options) => {
  const id = options.url.match(/\/command-sys-user\/([\w-]+)\/roles$/)[1]
  const data = JSON.parse(options.body)
  const index = userList.findIndex(item => item.id === id)
  if (index !== -1) {
    userList[index].roles = data.roleIds || []
    saveUserList(userList)
  }
  return { code: 200, message: '保存成功' }
})