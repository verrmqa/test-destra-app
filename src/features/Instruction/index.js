import React, { useEffect, useState } from 'react';
import { getInstruction } from '../../services/instructionService';
import decrypt from '../../helpers/decrypt';
import Loader from '../Loader';
import RegistrationLock from '../../containers/RegistrationLock';
import Render from '../../containers/Render';
import Filter from '../../containers/Filter';
import Stage from '../../containers/Stage';

import './Instruction.style.css';
import './Instruction.widescreen.css';
import './Instruction.tablet.css';
import './Instruction.mobile.css';

function Instruction() {
    const [instruction, setInstruction] = useState();
    const [loading, setLoading] = useState(true);
    const [stateObj, setStateObj] = useState({
      "filter": {
        "type": [
          2
        ],
        "water_problem": [
          0
        ],
        "electricity_problem": [
          0
        ],
        "heating_problem": [
          0
        ],
        "gas_problem": [
          0
        ]
      },
      "isOpen": false,
      "mobileFilterIsOpen": false,
      "docsCards": [],
      "lockCounter": 10,
      "showIntroHelp": false
    });
    const [propsObj, setPropsObj] = useState({
      "history": {
        "length": 7,
        "action": "PUSH",
        "location": {
          "search": "?type=2&water_problem=0&electricity_problem=0&heating_problem=0&gas_problem=0",
          "pathname": "/catalog/housing-and-communal-services/nonquality-communal-services",
          "hash": "",
          "key": "tumchs"
        }
      },
      "location": {
        "search": "?type=0&water_problem=0&electricity_problem=0&heating_problem=0&gas_problem=0",
        "pathname": "/catalog/housing-and-communal-services/nonquality-communal-services",
        "hash": "",
        "key": "jnn3nh"
      },
      "match": {
        "path": "/catalog/:categorySlug/:slug",
        "url": "/catalog/housing-and-communal-services/nonquality-communal-services",
        "isExact": true,
        "params": {
          "categorySlug": "housing-and-communal-services",
          "slug": "nonquality-communal-services"
        }
      },
      "route": {
        "path": "/catalog/:categorySlug/:slug",
        "exact": true
      },
      "user": null,
      "instruction": {
        "video": {},
        "faq": [],
        "views": 0,
        "_id": "5da6dc19e26cea005a847fc7",
        "home": {
          "show": false,
          "order": 1,
          "_id": "5e837e077cebec0da1ae2be3",
          "image": ""
        },
        "catalog": {
          "show": true,
          "order": 1,
          "popular": true,
          "_id": "5e837e077cebecb10dae2be4"
        },
        "slug": "nonquality-communal-services",
        "title": "Некачественные коммунальные услуги",
        "description": "Недовольны качеством воды, газа или электричества? Узнайте, как получить компенсацию и добиться устранения проблем.",
        "values": [
          {
            "_id": "5e837e077cebecca13ae2bee",
            "id": "type",
            "label": "Тип коммунальных услуг",
            "_type": "radio",
            "value": [
              {
                "id": 0,
                "value": "Вода и канализация",
                "default": true
              },
              {
                "id": 1,
                "value": "Электричество"
              },
              {
                "id": 2,
                "value": "Отопление"
              },
              {
                "id": 3,
                "value": "Газ"
              }
            ],
            "condition": []
          },
          {
            "_id": "5e837e077cebec8351ae2bec",
            "id": "water_problem",
            "_type": "multiselect",
            "label": "В чем проблема с водой?",
            "condition": [
              {
                "_id": "5e837e077cebec8caeae2bed",
                "id": "type",
                "value": 0,
                "condition": []
              }
            ],
            "value": [
              {
                "id": 0,
                "value": "Перебои в подаче",
                "default": true
              },
              {
                "id": 1,
                "value": "Температура воды"
              },
              {
                "id": 2,
                "value": "Состав и давление воды"
              },
              {
                "id": 3,
                "value": "Канализация"
              }
            ]
          },
          {
            "_id": "5e837e077cebec03bcae2bea",
            "id": "electricity_problem",
            "_type": "multiselect",
            "label": "В чем проблема с электричеством?",
            "condition": [
              {
                "_id": "5e837e077cebec7936ae2beb",
                "id": "type",
                "value": 1,
                "condition": []
              }
            ],
            "value": [
              {
                "id": 0,
                "value": "Перебои в подаче",
                "default": true
              },
              {
                "id": 1,
                "value": "Напряжение и частота тока"
              }
            ]
          },
          {
            "_id": "5e837e077cebec6b9aae2be8",
            "id": "heating_problem",
            "_type": "multiselect",
            "label": "В чем проблема с отоплением?",
            "condition": [
              {
                "_id": "5e837e077cebec3609ae2be9",
                "id": "type",
                "value": 2,
                "condition": []
              }
            ],
            "value": [
              {
                "id": 0,
                "value": "Перебои в подаче",
                "default": true
              },
              {
                "id": 1,
                "value": "Температура воздуха в помещении"
              },
              {
                "id": 2,
                "value": "Отопление не включают"
              },
              {
                "id": 3,
                "value": "Давление в батареях"
              }
            ]
          },
          {
            "_id": "5e837e077cebec625bae2be6",
            "id": "gas_problem",
            "_type": "multiselect",
            "label": "В чем проблема с газом?",
            "condition": [
              {
                "_id": "5e837e077cebec29deae2be7",
                "id": "type",
                "value": 3,
                "condition": []
              }
            ],
            "value": [
              {
                "id": 0,
                "value": "Перебои в подаче",
                "default": true
              },
              {
                "id": 1,
                "value": "Давление газа"
              }
            ]
          }
        ],
        "stages": [
          {
            "_id": "5e837e077cebec18bcae2c3c",
            "id": 0,
            "data": [
              {
                "_id": "5e837e077cebec21c5ae2c4f",
                "title": "Изучите стандарты качества услуг",
                "condition": [
                  {
                    "_id": "5e837e077cebec9958ae2c50",
                    "id": "type",
                    "value": 0,
                    "condition": []
                  }
                ],
                "content": [
                  {
                    "format": [],
                    "_id": "5e837e077cebec1207ae2c54",
                    "_type": "text",
                    "value": "Вы не должны платить полную стоимость коммунальных услуг, если они не соответствуют государственным нормативам. Проверьте платёжную квитанцию за отчётный период (обычно это месяц): если сумму не скорректировали, и вас просят заплатить по полному тарифу, это нарушает ваши права.",
                    "condition": [],
                    "template": "default"
                  },
                  {
                    "format": [],
                    "_id": "5e837e077cebec3991ae2c53",
                    "_type": "ol",
                    "value": [
                      {
                        "_type": "block",
                        "condition": [
                          {
                            "id": "water_problem",
                            "value": 0
                          }
                        ],
                        "value": [
                          {
                            "_type": "text",
                            "value": "Холодную и горячую воду должны подавать бесперебойно и круглосуточно, за исключением:",
                            "template": "default"
                          },
                          {
                            "_type": "ul",
                            "value": [
                              {
                                "_type": "text",
                                "value": "максимум 8 часов суммарно в течение месяца, 4 часа единовременно, в том числе при аварии. В исключительном случае, при аварии на тупиковой магистрали, допускается перерыв в 24 часа",
                                "template": "default"
                              },
                              {
                                "_type": "text",
                                "value": "Ежегодное отключение горячей воды на 14 дней для профилактических и ремонтных работ",
                                "template": "default"
                              }
                            ],
                            "template": "default"
                          }
                        ],
                        "template": "default"
                      }
                    ],
                    "condition": [],
                    "template": "default"
                  }
                ]
              }
            ]
          },
          {
            "_id": "5e837e077cebecbfb0ae2c33",
            "id": 1,
            "data": [
              {
                "_id": "5e837e077cebec2794ae2c34",
                "title": "Зафиксируйте проблему",
                "content": [
                  {
                    "format": [],
                    "_id": "5e837e077cebec2aa2ae2c3b",
                    "_type": "block",
                    "value": [
                      {
                        "_type": "text",
                        "value": [
                          "Позвоните в аварийную службу ",
                          {
                            "_type": "hint",
                            "value": [
                              {
                                "_type": "text",
                                "value": [
                                  "Контакты аварийной службы обычно размещены на сайте вашего региона, города, или муниципального образования. Например, в Москве их можно найти ",
                                  {
                                    "_type": "link",
                                    "href": "https://www.mos.ru/otvet-dom-i-dvor/kak-svyazatsya-s-dispetcherskoy-sluzhboy/",
                                    "value": "здесь",
                                    "template": "default"
                                  },
                                  ""
                                ],
                                "template": "default"
                              }
                            ],
                            "template": "default"
                          },
                          ""
                        ],
                        "template": "default"
                      }
                    ],
                    "condition": [],
                    "template": "default"
                  },
                  {
                    "format": [],
                    "_id": "5e837e077cebec48a7ae2c3a",
                    "_type": "text",
                    "value": "Опишите проблему и попросите аварийную службу назначить проверку с составлением акта по её результатам. Проверку должны провести в течение 2 часов после вашего звонка; если это не подходит, можно назначить удобное для вас время.",
                    "condition": [],
                    "template": "default"
                  },
                  {
                    "format": [],
                    "_id": "5e837e077cebec58eaae2c39",
                    "_type": "note",
                    "value": [
                      {
                        "_type": "b",
                        "value": "Совет",
                        "template": "default"
                      },
                      {
                        "_type": "text",
                        "value": "Обязательно потребуйте от сотрудника, который принял ваш звонок, чтобы тот продиктовал вам свои ФИО, номер и время регистрации вашего сообщения на тот случай, если сотрудники не приедут и ваше обращение останется без внимания.",
                        "template": "default"
                      }
                    ],
                    "condition": [],
                    "template": "default"
                  },
                  {
                    "format": [],
                    "_id": "5e837e077cebec816aae2c38",
                    "_type": "title",
                    "level": 6,
                    "value": "Составьте акт о выявленных нарушениях",
                    "condition": [],
                    "template": "default"
                  },
                  {
                    "format": [],
                    "_id": "5e837e077cebec3dbbae2c37",
                    "_type": "text",
                    "value": "Акт официально удостоверяет наличие проблемы и подкрепляет ваши требования, в том числе в суде. Его шаблон обычно есть у представителя аварийной службы. В акте следует указать:",
                    "condition": [],
                    "template": "default"
                  },
                  {
                    "format": [],
                    "_id": "5e837e077cebec1167ae2c36",
                    "_type": "ul",
                    "value": [
                      {
                        "_type": "text",
                        "value": "ваши ФИО и контактные данные",
                        "template": "default"
                      },
                      {
                        "_type": "text",
                        "value": "дату и время проведения проверки",
                        "template": "default"
                      },
                      {
                        "_type": "text",
                        "value": "участников проверки",
                        "template": "default"
                      },
                      {
                        "_type": "text",
                        "value": "нарушения стандартов предоставления услуг",
                        "template": "default"
                      },
                      {
                        "_type": "text",
                        "value": "инструменты, с помощью которых нарушения стандартов предоставления услуг были выявлены",
                        "template": "default"
                      },
                      {
                        "_type": "text",
                        "value": "описание нарушения и его последствий, по возможности с фотографиями",
                        "template": "default"
                      }
                    ],
                    "condition": [],
                    "template": "default"
                  },
                  {
                    "format": [],
                    "_id": "5e837e077cebecf45bae2c35",
                    "_type": "note",
                    "value": "Вы можете составить акт сами, попросив хотя бы двух незаинтересованных лиц (например, соседей) подписать документ. Тем не менее, акт, составленный с представителем аварийной службы, надёжнее.",
                    "condition": [],
                    "template": "default"
                  }
                ],
                "condition": []
              }
            ]
          },
          {
            "_id": "5e837e077cebec5e7fae2c29",
            "id": 2,
            "data": [
              {
                "_id": "5e837e077cebec4788ae2c2a",
                "title": "Свяжитесь с управляющей организацией",
                "content": [
                  {
                    "format": [],
                    "_id": "5e837e077cebec4be9ae2c32",
                    "_type": "title",
                    "level": 6,
                    "value": "Определите ответственных",
                    "condition": [],
                    "template": "default"
                  },
                  {
                    "format": [],
                    "_id": "5e837e077cebec4c6eae2c31",
                    "_type": "block",
                    "value": [
                      {
                        "_type": "text",
                        "value": "За качество коммунальных услуг обычно отвечает Управляющая компания, ТСЖ, или Кооператив.",
                        "template": "default"
                      },
                      {
                        "_type": "block",
                        "value": [
                          {
                            "_type": "text",
                            "value": [
                              "Найдите ответственных по домашнему адресу в поле «Найти свой дом» на сайте ",
                              {
                                "_type": "link",
                                "value": "«Реформа ЖКХ»",
                                "href": "https://www.reformagkh.ru",
                                "template": "default"
                              },
                              "."
                            ],
                            "template": "default"
                          }
                        ],
                        "template": "default"
                      }
                    ],
                    "condition": [],
                    "template": "default"
                  },
                  {
                    "format": [],
                    "_id": "5e837e077cebec1759ae2c30",
                    "_type": "text",
                    "value": "В случае, если ваш дом управляется непосредственно жильцами (это доступно для домов, количество квартир в которых составляет не более тридцати), за качество услуг отвечает ресурсоснабжающая организация (например, Мосэнерго).",
                    "condition": [],
                    "template": "default"
                  },
                  {
                    "format": [],
                    "_id": "5e837e077cebec4f84ae2c2f",
                    "_type": "title",
                    "level": 6,
                    "value": "Направьте акт о выявленных нарушениях одним из способов",
                    "condition": [],
                    "template": "default"
                  },
                  {
                    "_type": "text",
                    "value": [
                      "Направьте акт заказным письмом онлайн через ",
                      {
                        "_type": "link",
                        "href": "https://zakaznoe.pochta.ru/?utm_source=pochtaru&utm_medium=tracking&utm_campaign=zakaznoe&utm_content=banner2_4",
                        "value": "сервис Почты России",
                        "template": "default"
                      },
                      ". ",
                      {
                        "_type": "hint",
                        "value": [
                          {
                            "_type": "text",
                            "value": "Вам понадобится подтвержденная учетная запись на портале Госуслуг.",
                            "template": "default"
                          }
                        ],
                        "template": "default"
                      },
                      " Вам не нужно посещать отделение Почты, письмо будет доставлено в электронном виде."
                    ],
                    "template": "default"
                  },
                  {
                    "_type": "text",
                    "value": [
                      "Во вкладке «новое письмо» выберите пункт «в организацию», укажите наименование организации, ее адрес, а также свой адрес. Загрузите акт в формате PDF, нажав на кнопку “Загрузить письмо”. ",
                      {
                        "_type": "hint",
                        "value": [
                          {
                            "_type": "text",
                            "value": "Обратите внимание, почтовые услуги платные.",
                            "template": "default"
                          }
                        ],
                        "template": "default"
                      },
                      " Сохраните отчет о доставке (его можно найти во вкладке “Исходящие”), он является доказательством отправки претензии."
                    ],
                    "template": "default"
                  },
                  {
                    "format": [],
                    "_id": "5e837e077cebec8b62ae2c2c",
                    "_type": "collapse",
                    "title": "Как еще можно отправить акт?",
                    "value": [
                      {
                        "_type": "ul",
                        "value": [
                          {
                            "_type": "block",
                            "value": [
                              {
                                "_type": "text",
                                "value": [
                                  "Доставьте акт лично. Не забудьте зарегистрировать его в офисе ответственной организации ",
                                  {
                                    "_type": "hint",
                                    "value": "Должны поставить штамп или расписаться в получении и отдать копию вам.",
                                    "template": "default"
                                  },
                                  ""
                                ],
                                "template": "default"
                              }
                            ],
                            "template": "default"
                          },
                          {
                            "_type": "text",
                            "value": "Отправьте по электронной почте. Попросите подтвердить получение в тексте вашего письма и сохраните переписку",
                            "template": "default"
                          },
                          {
                            "_type": "text",
                            "value": "Заказным письмом с уведомлением о вручении адресату",
                            "format": [
                              {
                                "_type": "hint",
                                "value": "Почтовое уведомление о вручении является судебным доказательством"
                              }
                            ],
                            "template": "default"
                          }
                        ],
                        "template": "default"
                      }
                    ],
                    "condition": [],
                    "template": "default"
                  },
                  {
                    "format": [],
                    "_id": "5e837e077cebec4599ae2c2b",
                    "_type": "note",
                    "value": "Если организация отказывается подтверждать получение акта или не отвечает на ваши письма, направьте его заказным письмом с уведомлением о вручении.",
                    "condition": [],
                    "template": "default"
                  }
                ],
                "condition": []
              }
            ]
          },
          {
            "_id": "5e837e077cebec1a8eae2c1e",
            "id": 3,
            "data": [
              {
                "_id": "5e837e077cebec73eaae2c1f",
                "title": "Направьте претензию",
                "content": [
                  {
                    "format": [],
                    "_id": "5e837e077cebec665dae2c28",
                    "_type": "text",
                    "value": "Если на акт о нарушениях вам ответили отрицательно или не ответили вовсе, мы советуем направить претензию управляющей организации.",
                    "condition": [],
                    "template": "default"
                  },
                  {
                    "format": [],
                    "_id": "5e837e077cebec68a3ae2c27",
                    "_type": "or_elements",
                    "value": [
                      {
                        "_type": "button",
                        "action": "document",
                        "id": "pretension_communal",
                        "template": "default"
                      }
                    ],
                    "condition": [],
                    "template": "default"
                  },
                  {
                    "format": [],
                    "_id": "5e837e077cebecc664ae2c26",
                    "_type": "title",
                    "level": 6,
                    "value": "Соберите документы",
                    "condition": [],
                    "template": "default"
                  },
                  {
                    "format": [],
                    "_id": "5e837e077cebec5294ae2c25",
                    "_type": "text",
                    "value": "К претензии необходимо приложить фотоматериалы с фиксацией нарушений, акт о выявленных нарушениях стандартов предоставления коммунальных услуг и иные доказательства.",
                    "condition": [],
                    "template": "default"
                  },
                  {
                    "format": [],
                    "_id": "5e837e077cebecc129ae2c24",
                    "_type": "title",
                    "level": 6,
                    "value": "Подпишите претензию и направьте управляющую организацию одним из способов",
                    "condition": [],
                    "template": "default"
                  },
                  {
                    "_type": "text",
                    "value": [
                      "Направьте претензию заказным письмом онлайн через ",
                      {
                        "_type": "link",
                        "href": "https://zakaznoe.pochta.ru/?utm_source=pochtaru&utm_medium=tracking&utm_campaign=zakaznoe&utm_content=banner2_4",
                        "value": "сервис Почты России",
                        "template": "default"
                      },
                      ". ",
                      {
                        "_type": "hint",
                        "value": [
                          {
                            "_type": "text",
                            "value": "Вам понадобится подтвержденная учетная запись на портале Госуслуг.",
                            "template": "default"
                          }
                        ],
                        "template": "default"
                      },
                      " Вам не нужно посещать отделение Почты, письмо будет доставлено в электронном виде."
                    ],
                    "template": "default"
                  },
                  {
                    "_type": "text",
                    "value": [
                      "Во вкладке «новое письмо» выберите пункт «в организацию», укажите наименование организации, ее адрес, а также свой адрес. Загрузите претензию в формате PDF, нажав на кнопку “Загрузить письмо”. ",
                      {
                        "_type": "hint",
                        "value": [
                          {
                            "_type": "text",
                            "value": "Обратите внимание, почтовые услуги платные.",
                            "template": "default"
                          }
                        ],
                        "template": "default"
                      },
                      " Сохраните отчет о доставке (его можно найти во вкладке “Исходящие”), он является доказательством отправки претензии."
                    ],
                    "template": "default"
                  },
                  {
                    "format": [],
                    "_id": "5e837e077cebecc49fae2c21",
                    "_type": "collapse",
                    "title": "Как еще можно отправить претензию?",
                    "value": [
                      {
                        "_type": "ul",
                        "value": [
                          {
                            "_type": "block",
                            "value": [
                              {
                                "_type": "text",
                                "value": [
                                  "Доставьте претензию лично. Не забудьте зарегистрировать его в офисе ответственной организации ",
                                  {
                                    "_type": "hint",
                                    "value": "Должны поставить штамп или расписаться в получении и отдать копию вам.",
                                    "template": "default"
                                  },
                                  ""
                                ],
                                "template": "default"
                              }
                            ],
                            "template": "default"
                          },
                          {
                            "_type": "text",
                            "value": "Отправьте по электронной почте. Попросите подтвердить получение в тексте вашего письма и сохраните переписку",
                            "template": "default"
                          },
                          {
                            "_type": "text",
                            "value": "Заказным письмом с уведомлением о вручении адресату",
                            "format": [
                              {
                                "_type": "hint",
                                "value": "Почтовое уведомление о вручении является судебным доказательством"
                              }
                            ],
                            "template": "default"
                          }
                        ],
                        "template": "default"
                      }
                    ],
                    "condition": [],
                    "template": "default"
                  },
                  {
                    "format": [],
                    "_id": "5e837e077cebec5b37ae2c20",
                    "_type": "note",
                    "value": "Если организация отказывается подтверждать получение претензии или не отвечает на ваши письма, направьте его заказным письмом с уведомлением о вручении.",
                    "condition": [],
                    "template": "default"
                  }
                ],
                "condition": []
              }
            ]
          },
          {
            "_id": "5e837e077cebec0f26ae2c16",
            "id": 4,
            "data": [
              {
                "_id": "5e837e077cebec8076ae2c17",
                "title": "Направьте жалобу в Роспотребнадзор",
                "content": [
                  {
                    "format": [],
                    "_id": "5e837e077cebec755aae2c1d",
                    "_type": "text",
                    "value": "По вашей жалобе Роспотребнадзор может провести внеплановую проверку управляющей организации и наложить на нее крупный штраф за нарушение ваших прав (до 50 000 рублей). Проверка со стороны Роспотребнадзора зачастую побуждает управляющую организацию возместить ущерб.",
                    "condition": [],
                    "template": "default"
                  },
                  {
                    "format": [],
                    "_id": "5e837e077cebec5be8ae2c1c",
                    "_type": "note",
                    "value": "Учтите, чтобы по вашей жалобе была проведена внеплановая проверка управляющей организации, вам необходимо сначала обратиться в саму управляющую организацию с письменной претензией. Если управляющая организация отказала в удовлетворении ваших требований или оставила претензию без внимания, можете смело обращаться в Роспотребнадзор.",
                    "condition": [],
                    "template": "default"
                  },
                  {
                    "_type": "text",
                    "value": [
                      "Жалобу можно подать через ",
                      {
                        "_type": "link",
                        "value": "сайт Роспотребнадзора",
                        "href": "https://petition.rospotrebnadzor.ru/petition/",
                        "template": "default"
                      },
                      ". ",
                      {
                        "_type": "hint",
                        "value": "Если вы хотите, чтобы по вашей жалобе была проведена внеплановая проверка, до подачи нужно будет авторизоваться через Госуслуги.",
                        "template": "default"
                      },
                      ""
                    ],
                    "template": "default"
                  },
                  {
                    "format": [],
                    "_id": "5e837e077cebec746cae2c1a",
                    "_type": "text",
                    "value": "При подаче выберите территориальное управление Роспотребнадзора по месту нахождения управляющей или ресурсоснабжающей организации. В поле \"Текст обращения\" укажите \"предоставление некачественных коммунальных услуг. Жалоба во вложении\". ",
                    "condition": [],
                    "template": "default"
                  },
                  {
                    "format": [],
                    "_id": "5e837e077cebec830aae2c19",
                    "_type": "text",
                    "value": "Ваша жалоба должна быть рассмотрена в течение 30 дней.",
                    "condition": [],
                    "template": "default"
                  },
                  {
                    "format": [],
                    "_id": "5e837e077cebecdf74ae2c18",
                    "_type": "or_elements",
                    "value": [
                      {
                        "_type": "button",
                        "action": "document",
                        "id": "rospotreb_communal",
                        "label": "",
                        "template": "default"
                      }
                    ],
                    "condition": [],
                    "template": "default"
                  }
                ],
                "condition": []
              }
            ]
          },
          {
            "_id": "5e837e077cebec1f81ae2c0f",
            "id": 5,
            "data": [
              {
                "_id": "5e837e077cebec8230ae2c10",
                "title": "Направьте жалобу в жилищную инспекцию",
                "content": [
                  {
                    "format": [],
                    "_id": "5e837e077cebec3fd2ae2c15",
                    "_type": "text",
                    "value": "Если управляющая организация оставила вашу претензию без внимания или ответила на нее отказом, направляйте жалобу в жилищную инспекцию.",
                    "condition": [],
                    "template": "default"
                  },
                  {
                    "format": [],
                    "_id": "5e837e077cebecdb55ae2c14",
                    "_type": "text",
                    "value": "Жилищная инспекция не сможет возместить вам причиненный ущерб, однако, она может провести внеплановую проверку управляющей организации и выдать ей предписание об устранении нарушений. Обращение в жилищную инспекцию зачастую побуждает управляющую организацию возместить ущерб.",
                    "condition": [],
                    "template": "default"
                  },
                  {
                    "_type": "text",
                    "value": [
                      "Мы рекомендуем подавать жалобу через сайт ",
                      {
                        "_type": "link",
                        "value": "ГИС ЖКХ",
                        "href": "https://dom.gosuslugi.ru",
                        "template": "default"
                      },
                      ", тогда по вашей жалобе будет проведена внеплановая проверка управляющей организации ",
                      {
                        "_type": "hint",
                        "value": "Вам понадобится подтвержденная учетная запись на портале Госуслуги.",
                        "template": "default"
                      },
                      ". Для Москвы жалобу можно также подать через сайт ",
                      {
                        "_type": "link",
                        "value": "электронной приемной жилищной инспекции г. Москвы",
                        "href": "https://www.mos.ru/feedback/reception/",
                        "template": "default"
                      },
                      " ",
                      {
                        "_type": "hint",
                        "value": "Вам понадобится подтвержденная учетная запись на портале Госуслуги.",
                        "template": "default"
                      },
                      ": в поле \"Получатель обращения\" выберите Государственную жилищную инспекцию города Москвы, в поле \"Содержание обращения\" укажите \"предоставление некачественных коммунальных услуг. Жалоба во вложении\". Копию подписанной претензии с приложениями прикрепите к обращению. ",
                      {
                        "_type": "hint",
                        "value": [
                          "Вы также можете отправить жалобу на ",
                          {
                            "_type": "link",
                            "value": "электронную почту жилищной инспекции вашего округа",
                            "href": "https://www.mos.ru/mgi/organizations/",
                            "template": "default"
                          },
                          ", однако в этом случае по жалобе не будет проведена внеплановая проверка."
                        ],
                        "template": "default"
                      },
                      ""
                    ],
                    "template": "default"
                  },
                  {
                    "format": [],
                    "_id": "5e837e077cebec1721ae2c12",
                    "_type": "text",
                    "value": "Ваша жалоба должна быть рассмотрена в течение 30 дней.",
                    "condition": [],
                    "template": "default"
                  },
                  {
                    "format": [],
                    "_id": "5e837e077cebecfd9eae2c11",
                    "_type": "or_elements",
                    "value": [
                      {
                        "_type": "button",
                        "action": "document",
                        "id": "inspection_communal",
                        "label": "",
                        "template": "default"
                      }
                    ],
                    "condition": [],
                    "template": "default"
                  }
                ],
                "condition": []
              }
            ]
          },
          {
            "_id": "5e837e077cebec3123ae2c06",
            "id": 6,
            "data": [
              {
                "_id": "5e837e077cebec8635ae2c07",
                "title": "Составьте исковое заявление",
                "content": [
                  {
                    "format": [],
                    "_id": "5e837e077cebecfe50ae2c0e",
                    "_type": "title",
                    "level": 6,
                    "value": "Выберите суд",
                    "condition": [],
                    "template": "default"
                  },
                  {
                    "format": [],
                    "_id": "5e837e077cebec67ccae2c0d",
                    "_type": "text",
                    "value": "Для того, чтобы понять, в какой суд обращаться, нужно рассчитать цену иска. Если цена вашего иска больше 100 000 руб., исковое заявление подается в районный (городской) суд. Если меньше, вам в мировой суд.",
                    "condition": [],
                    "template": "default"
                  },
                  {
                    "format": [],
                    "_id": "5e837e077cebec2398ae2c0c",
                    "_type": "or_elements",
                    "value": [
                      {
                        "_type": "button",
                        "action": "document",
                        "id": "action_communal",
                        "template": "default"
                      }
                    ],
                    "condition": [],
                    "template": "default"
                  },
                  {
                    "format": [],
                    "_id": "5e837e077cebec5dc5ae2c0b",
                    "_type": "text",
                    "value": "К исковому приложите:",
                    "condition": [],
                    "template": "default"
                  },
                  {
                    "format": [],
                    "_id": "5e837e077cebec4834ae2c0a",
                    "_type": "ul",
                    "value": [
                      {
                        "_type": "text",
                        "value": "Документ,  подтверждающий ваши жилищные права: например, выписка из ЕГРН для собственников или договор аренды для нанимателей",
                        "template": "default"
                      },
                      {
                        "_type": "text",
                        "value": "Копии искового заявления по числу лиц, участвующих в деле",
                        "template": "default"
                      },
                      {
                        "_type": "text",
                        "value": "Подтверждение уплаты государственной пошлины (например, квитанция из банка)",
                        "template": "default"
                      },
                      {
                        "_type": "text",
                        "value": [
                          "Документы, подтверждающие обстоятельства, на которые вы ссылаетесь в иске с копиями для ответчика ",
                          {
                            "_type": "hint",
                            "value": [
                              {
                                "_type": "ul",
                                "value": [
                                  {
                                    "_type": "text",
                                    "value": "Акт о выявленных нарушениях стандартов предоставления коммунальных услуг",
                                    "template": "default"
                                  },
                                  {
                                    "_type": "text",
                                    "value": "Претензия к управляющей или ресурсоснабжающей организации и ответ на претензию",
                                    "template": "default"
                                  },
                                  {
                                    "_type": "text",
                                    "value": "Жалобы в Жилищную инспекцию, прокуратуру, Роспотребнадзор и ответы на них",
                                    "template": "default"
                                  }
                                ],
                                "template": "default"
                              }
                            ],
                            "template": "default"
                          },
                          ""
                        ],
                        "template": "default"
                      },
                      {
                        "_type": "text",
                        "value": "Расчет цены иска",
                        "template": "default"
                      }
                    ],
                    "condition": [],
                    "template": "default"
                  },
                  {
                    "_type": "text",
                    "value": [
                      "Исковое заявление подается в суд по месту нахождения управляющей или ресурсоснабжающей организации. Найти адрес нужного ",
                      {
                        "_type": "link",
                        "value": "районного (городского)",
                        "href": "https://sudrf.ru/index.php?id=300",
                        "template": "default"
                      },
                      " или ",
                      {
                        "_type": "link",
                        "value": "мирового",
                        "href": "https://sudrf.ru/index.php?id=300&var=true",
                        "template": "default"
                      },
                      " суда можно по ссылкам."
                    ],
                    "template": "default"
                  },
                  {
                    "format": [],
                    "_id": "5e837e077cebec02feae2c08",
                    "_type": "collapse",
                    "title": "Как рассчитать цену иска?",
                    "value": [
                      {
                        "_type": "text",
                        "value": "Цена иска = плата за коммунальную услугу + неустойка.",
                        "template": "default"
                      },
                      {
                        "_type": "text",
                        "value": "Вы можете взыскать неустойку 3% от платы за коммунальные услуги за каждый день невыполнения ваших требований. Неустойка = (сумма, указанная в квитанции за услугу) * 0,03 * (количество дней просрочки). Количество дней просрочки - это количество дней, прошедших с даты получения управляющей или ресурсоснабжающей компанией претензии, минус 10 дней.",
                        "template": "default"
                      }
                    ],
                    "condition": [],
                    "template": "default"
                  }
                ],
                "condition": []
              }
            ]
          },
          {
            "_id": "5e837e077cebecd592ae2c02",
            "id": 7,
            "data": [
              {
                "_id": "5e837e077cebeceb14ae2c03",
                "title": "Направьте документы ответчику",
                "content": [
                  {
                    "_type": "text",
                    "value": [
                      "По закону вам нужно отправить иск ответчику до того, как вы обратитесь в суд. Направьте иск заказным письмом онлайн через ",
                      {
                        "_type": "link",
                        "value": "сервис Почты России",
                        "href": "https://www.pochta.ru/",
                        "template": "default"
                      },
                      " или непосредственно через почтовое отделение.Вам понадобится подтвержденная учетная запись на портале ",
                      {
                        "_type": "link",
                        "value": "Госуслуг",
                        "href": "https://www.mos.ru/services/catalog/popular/",
                        "template": "default"
                      },
                      "."
                    ],
                    "template": "default"
                  },
                  {
                    "format": [],
                    "_id": "5e837e077cebec267eae2c04",
                    "_type": "text",
                    "value": "Во вкладке «новое письмо» выберите пункт «в организацию», укажите наименование управляющей или ресурсоснабжающей организации, ее адрес, а также свой адрес. Загрузите иск в формате PDF, нажав на кнопку “Загрузить письмо”.Следующим письмом тому же адресату направьте приложения к иску Сохраните отчет о доставке (его можно найти во вкладке “Исходящие”), он является доказательством отправки иска и приложений к нему. Обратите внимание, почтовые услуги платные.",
                    "condition": [],
                    "template": "default"
                  }
                ],
                "condition": []
              }
            ]
          },
          {
            "_id": "5e837e077cebec17aaae2bf5",
            "id": 8,
            "data": [
              {
                "_id": "5e837e077cebec49f3ae2bf6",
                "title": "Подайте иск в суд",
                "content": [
                  {
                    "format": [],
                    "_id": "5e837e077cebecfefbae2c01",
                    "_type": "title",
                    "level": 6,
                    "value": "Мировой суд",
                    "condition": [],
                    "template": "default"
                  },
                  {
                    "_type": "text",
                    "value": [
                      "Если вы подаёте исковое заявление мировому судье, вы можете подать подписанное заявление лично в канцелярию суда ",
                      {
                        "_type": "hint",
                        "value": "Советуем посмотреть расписание приёма заявлений и часы работы канцелярии до поездки в суд.",
                        "template": "default"
                      },
                      " или направить заказным письмом с описью вложения и уведомлением о вручении по адресу суда ",
                      {
                        "_type": "hint",
                        "value": "Сохраните все чеки и квитанции с почтового отправления.",
                        "template": "default"
                      },
                      ". При личной подаче на вашем иске должны поставить отметку о принятии - сфотографируйте иск с отметкой."
                    ],
                    "template": "default"
                  },
                  {
                    "format": [],
                    "_id": "5e837e077cebec4be2ae2bff",
                    "_type": "text",
                    "value": "",
                    "condition": [],
                    "template": "default"
                  },
                  {
                    "format": [],
                    "_id": "5e837e077cebec2d7aae2bfe",
                    "_type": "title",
                    "level": 6,
                    "value": "Районный (городской) суд",
                    "condition": [],
                    "template": "default"
                  },
                  {
                    "format": [],
                    "_id": "5e837e077cebec3dbfae2bfd",
                    "_type": "text",
                    "value": "Если вы подаёте исковое заявление в районный суд, вы можете:",
                    "condition": [],
                    "template": "default"
                  },
                  {
                    "format": [],
                    "_id": "5e837e077cebec7e17ae2bfc",
                    "_type": "ul",
                    "value": [
                      {
                        "_type": "text",
                        "value": [
                          "подать онлайн через ",
                          {
                            "_type": "link",
                            "href": "https://ej.sudrf.ru/appeals/",
                            "value": "\"ГАС Правосудие\"",
                            "template": "default"
                          },
                          " ",
                          {
                            "_type": "hint",
                            "value": [
                              {
                                "_type": "text",
                                "value": [
                                  "Для подачи через ГАС Правосудие вам необходимо иметь подтверждённую учётную запись на портале Госуслуги. Подтвердить учётную запись можно в интернет-банках ",
                                  {
                                    "_type": "link",
                                    "href": "https://www.sberbank.ru/ru/person/dist_services/gosuslugi/accounting_confirmation",
                                    "value": "Сбербанк Онлайн",
                                    "template": "default"
                                  },
                                  ", ",
                                  {
                                    "_type": "link",
                                    "href": "https://www.tinkoff.ru/payments/categories/state-services/esia/",
                                    "value": "Тинькофф",
                                    "template": "default"
                                  },
                                  ", ",
                                  {
                                    "_type": "link",
                                    "href": "https://www.pochtabank.ru/service/gosuslugi",
                                    "value": "Почта Банк Онлайн",
                                    "template": "default"
                                  },
                                  " или в Центре обслуживания Госуслуг. Подробную инструкцию по подтверждению учётной записи можно найти ",
                                  {
                                    "_type": "link",
                                    "href": "https://www.gosuslugi.ru/help/faq/c-1/2",
                                    "value": "здесь",
                                    "template": "default"
                                  },
                                  "."
                                ],
                                "template": "default"
                              }
                            ],
                            "template": "default"
                          },
                          ""
                        ],
                        "template": "default"
                      },
                      {
                        "_type": "text",
                        "value": [
                          "подать подписанное заявление в канцелярию суда лично ",
                          {
                            "_type": "hint",
                            "value": "Советуем посмотреть расписание приёма заявлений и часы работы канцелярии до поездки в суд.",
                            "template": "default"
                          },
                          ". При личной подаче на вашем иске должны поставить отметку о принятии - сфотографируйте иск с отметкой."
                        ],
                        "template": "default"
                      },
                      {
                        "_type": "text",
                        "value": "направить подписанное заявление по почте по адресу суда заказным письмом с описью вложения и уведомлением о вручении",
                        "template": "default"
                      }
                    ],
                    "condition": [],
                    "template": "default"
                  },
                  {
                    "format": [],
                    "_id": "5e837e077cebec5db0ae2bfb",
                    "_type": "block",
                    "value": [
                      {
                        "_type": "text",
                        "value": "Для подачи через ГАС Правосудие нужно:",
                        "template": "default"
                      },
                      {
                        "_type": "ul",
                        "value": [
                          {
                            "_type": "text",
                            "value": "авторизоваться на ГАС Правосудие через портал Госуслуги",
                            "template": "default"
                          },
                          {
                            "_type": "text",
                            "value": "распечатать и подписать исковое заявление",
                            "template": "default"
                          },
                          {
                            "_type": "text",
                            "value": "отсканировать или сфотографировать заявление так, чтобы подпись была чётко видна",
                            "template": "default"
                          },
                          {
                            "_type": "text",
                            "value": "сохранить копию заявления и приложения в формате PDF с возможностью копирования текста (макс. размер - 30 Мб)",
                            "template": "default"
                          },
                          {
                            "_type": "text",
                            "value": "при загрузке искового заявления и приложений наименования файлов должны содержать название документа и количество листов (например: Исковое заявление о взыскании ущерба от 05072019 1л.pdf)",
                            "template": "default"
                          }
                        ],
                        "template": "default"
                      }
                    ],
                    "condition": [],
                    "template": "default"
                  },
                  {
                    "format": [],
                    "_id": "5e837e077cebec3387ae2bfa",
                    "_type": "collapse",
                    "title": "Если цена вашего иска не превышает 1 000 000 руб., госпошлину платить не нужно",
                    "value": [
                      {
                        "_type": "text",
                        "value": [
                          "Рассчитать сумму госпошлины можно ",
                          {
                            "_type": "link",
                            "href": "https://www.mos-gorsud.ru/calc",
                            "value": "здесь",
                            "template": "default"
                          },
                          ". Выберите любой суд (это не имеет значения), раздел \"Подача искового заявления или административного искового заявления\", пункт \"Имущественного характера, подлежащего оценке\". Введите цену вашего иска."
                        ],
                        "template": "default"
                      },
                      {
                        "_type": "text",
                        "value": "Оплатить госпошлину можно в любом банкомате Сбербанка или в Сбербанк Онлайн в разделе \"Платежи\". Не забудьте приложить квитанцию об уплате пошлины к исковому заявлению.",
                        "template": "default"
                      }
                    ],
                    "condition": [],
                    "template": "default"
                  },
                  {
                    "_type": "text",
                    "value": [
                      "Вместе с исковым заявлением мы рекомендуем подать ",
                      {
                        "_type": "link",
                        "href": "https://destralegal.ru/api/v1/file/5d3e1acfaf0e9d0aeeda47a5",
                        "value": "расписку об уведомлении по СМС и электронной почте",
                        "template": "default"
                      },
                      ". Расписку нужно подписать и загрузить вместе с исковым заявлением. Если вы подаёте документы через ГАС Правосудие, разместите своё согласие на уведомление по СМС или электронной почте в разделе «Профиль пользователя» (отметка \"отправлять уведомления\")."
                    ],
                    "template": "default"
                  },
                  {
                    "format": [],
                    "_id": "5e837e077cebec827dae2bf8",
                    "_type": "text",
                    "value": "В течение двух месяцев со дня подачи иска по вашему делу должно быть назначено судебное заседание и дело должно быть рассмотрено.",
                    "condition": [],
                    "template": "default"
                  },
                  {
                    "_type": "text",
                    "value": [
                      "Узнать о назначении судебного заседания можно в личном кабинете на ",
                      {
                        "_type": "link",
                        "href": "https://ej.sudrf.ru/cases/",
                        "value": "ГАС Правосудие",
                        "template": "default"
                      },
                      ". Вас также должны уведомить о дате и времени судебного заседания по СМС и электронной почте. Тем не менее, мы рекомендуем время от времени проверять список дел, назначенных к слушанию, на сайте суда, чтобы заранее узнать о назначении заседания."
                    ],
                    "template": "default"
                  }
                ],
                "condition": []
              }
            ]
          },
          {
            "_id": "5e837e077cebec22e9ae2bef",
            "id": 9,
            "data": [
              {
                "_id": "5e837e077cebec45acae2bf0",
                "title": "Судебное заседание",
                "content": [
                  {
                    "_type": "text",
                    "value": [
                      "Вы можете не ходить на судебное заседание, если не хотите. Для этого, когда по вашему делу будет назначено заседание, вам надо отправить в суд ",
                      {
                        "_type": "link",
                        "value": "ходатайство",
                        "href": "https://destralegal.ru/api/v1/file/5d3f0f77af0e9da391da51e2",
                        "template": "default"
                      },
                      " о рассмотрении дела в ваше отсутствие и дело будет рассмотрено без вас, а судебное решение вы можете получить в личном кабинете на ",
                      {
                        "_type": "link",
                        "value": "ГАС Правосудие",
                        "href": "https://ej.sudrf.ru/cases/",
                        "template": "default"
                      },
                      " или по почте. ",
                      {
                        "_type": "hint",
                        "value": "Если вы дважды не явитесь на судебное заседание без подачи ходатайства о рассмотрении дела в ваше отсутствие, ваш иск оставят без рассмотрения.",
                        "template": "default"
                      },
                      ""
                    ],
                    "template": "default"
                  },
                  {
                    "_type": "text",
                    "value": [
                      "Тем не менее, мы рекомендуем явиться в суд и лично принять участие в судебном заседании. Для этого не обязательно обращаться к юристу или иметь юридическое образование - внимательно прочитайте ваше исковое и будьте готовы изложить обстоятельства вашего дела, а также ваши требования. ",
                      {
                        "_type": "hint",
                        "value": "Помните, к судье необходимо обращаться \"уважаемый суд\" и вставать при обращении.",
                        "template": "default"
                      },
                      " Если ваши права действительно были нарушены, суд примет решение в вашу пользу."
                    ],
                    "template": "default"
                  },
                  {
                    "_type": "text",
                    "value": [
                      "Суд оглашает свое решение сразу после заседания, однако копию решения суда вы сможете получить не раньше, чем через пять дней после окончания заседания. Получить копию решения в электронном виде можно на ",
                      {
                        "_type": "link",
                        "value": "ГАС Правосудие",
                        "href": "https://ej.sudrf.ru/cases/",
                        "template": "default"
                      },
                      "",
                      {
                        "_type": "hint",
                        "value": "Вам понадобится подтвержденная учетная запись на портале Госуслуг",
                        "template": "default"
                      },
                      "."
                    ],
                    "template": "default"
                  },
                  {
                    "_type": "note",
                    "value": [
                      "Учтите, решение суда вступает в силу через один месяц. В этот срок ответчик имеет право обжаловать решение в вышестоящий суд. ",
                      {
                        "_type": "hint",
                        "value": "Вы также можете в течение месяца подать апелляционную жалобу в вышестоящий суд и обжаловать решение, если оно вас не устроило.",
                        "template": "default"
                      },
                      ""
                    ],
                    "template": "default"
                  }
                ],
                "condition": []
              }
            ]
          }
        ],
        "category": {
          "order": 2,
          "_id": "5ca30fa881d3bebaf7b486eb",
          "slug": "housing-and-communal-services",
          "title": "ЖКХ",
          "icon": "home",
          "color": "30,194,140"
        },
        "intro": [],
        "__v": 10,
        "meta": {
          "_id": "5e837e077cebec5b9aae2be5",
          "title": "Некачественное оказание коммунальных услуг и ненадлежащее предоставление ЖКУ управляющей компанией",
          "description": "Destra ➡ если вы недовольны качеством воды, газа или электричества или прочих услуг ЖКХ? Узнайте, как получить компенсацию и добиться устранения проблем со стороны управляющей компании."
        },
        "summary": []
      },
      "categories": null,
      "filter": {
        "type": [
          0
        ],
        "water_problem": [
          0
        ],
        "electricity_problem": [
          0
        ],
        "heating_problem": [
          0
        ],
        "gas_problem": [
          0
        ]
      }
    });


    useEffect(() => {
        getInstruction('nonquality-communal-services')
        .then(res => {
            const {data} = res;
            const {result} = data;
            /* const {encrypted} = data; */
            /* console.log(encrypted); */
            /* console.log(stateObj);
            console.log(propsObj); */
            let decrypted;
            if (result) decrypted = decrypt(result);
            /* console.log(decrypted); */
            setInstruction(decrypted);
            setLoading(false);
        });
    }, []);

    const updateQueryStringWithParams = () => {

      const _propsObj = propsObj;

      /* const { history } = propsObj; */
      const { filter } = stateObj;
  
      const result = [];
  
      Object.keys(filter).map((key) => {
        if (filter[key] && filter[key].length > 1) {
          filter[key].map(item => result.push(`${key}=${item}`));
        } else if (!filter[key] || filter[key].length === 0) {
          result.push(`${key}=[]`);
        } else {
          result.push(`${key}=${filter[key]}`);
        }
      });
      console.log(_propsObj.history.location.search)
      _propsObj.history.location.search = result.toString().replace(/,/g, '&')
      console.log(_propsObj.history.location.search)

      setPropsObj(_propsObj);

      /* history.push({ search: result.toString().replace(/,/g, '&') }); */
    }

    const handleChange = (id, newValue, type) => {
      
      console.log(id)
      console.log(newValue)
      console.log(type)
      
      const { filter } = stateObj;
      const selectedId = filter[id];
  
      if (window.gtag) window.gtag('event', 'click_on_elements');
  
      if (type === 'multiselect') {
        if (selectedId.includes(newValue)) {
          const index = selectedId.indexOf(newValue);
  
          if (newValue !== -1) selectedId.splice(index, 1);
        } else {
          selectedId.push(newValue);
        }
      } else if (type === 'select' || type === 'radio') {
        filter[id] = [newValue];
      } else {
        filter[id] = newValue;
      }
      console.log(filter)
      updateQueryStringWithParams();
      setStateObj({ filter });
    }

    const renderFilter = () => {
        const { instruction } = propsObj;
        const { values } = instruction;
        const { filter } = stateObj;
    
        return <Filter type='instruction' values={values} handleChange={()=>handleChange()} filter={filter} />;
    }

    const renderStages = () => {
        const { filter, lockCounter, promoLock, block } = stateObj;
        const { instruction, user } = propsObj;
        const { stages } = instruction;
        let counter = 0;
    
        return (
          <div className='instruction__content__section instruction__content__section-stages'>
              <div className='instruction__stages'>
                {stages.map((stage, index) => (
                  <div key={stage._id} className='instruction__stages__section'>
                    {stage.data.map((data) => {
                        const { content, title, button } = data;
                        const handleRandomLock = typeof document !== 'undefined' && document.cookie.includes('instructionLock=true') && !user;
                        const promoPayCheck = typeof document !== 'undefined' && (document.cookie.includes('promo=paid') || document.cookie.includes('return-promo=paid'));
                        const handlePromoBlock = promoLock && !promoPayCheck && instruction._id === '5dcddf317f955fec3ac82867';
                        const handleReturnPromoBLock = promoLock && !promoPayCheck && instruction.category._id === '5c8e33c8b0f061081143feea';
                        counter++;
    
    
                        if (block && index <= block) {
                          return (
                            <Stage template={(handlePromoBlock || handleRandomLock || handleReturnPromoBLock) && counter > 2 && 'blur'} filter={filter} counter={counter} key={data._id} title={title} isButtonShown={index === block} button={button}>
                              {((handlePromoBlock || handleRandomLock || handleReturnPromoBLock) ? counter < 3 : true) && content.map(element => (
                                  <div key={element._id} className='instruction__block__content__section'>
                                    <Render filter={filter} element={element} />
                                  </div>
                                ))}
                            </Stage>
                          );
    }
    
                        if (!block) {
                          return (
                            <React.Fragment key={data._id}>
                              <Stage template={(handlePromoBlock || handleRandomLock || handleReturnPromoBLock) && counter > 2 && 'blur'} filter={filter} counter={counter} title={title}>
                                {((handlePromoBlock || handleRandomLock || handleReturnPromoBLock) ? counter < 3 : true) && content.map(element => (
                                    <div key={element._id} className='stage__content__section'>
                                      <Render filter={filter} element={element} />
                                    </div>
                                  ))}
                              </Stage>
                              {((handlePromoBlock || handleRandomLock || handleReturnPromoBLock) && counter === 2) && (
                                <div className='instruction__stages__section-lock'>
                                  <RegistrationLock
                                    message={promoLock ? 'Оплатите полный доступ, чтобы получить всю инструкцию' : `Вы видите 2 из ${lockCounter} шагов инструкции. Зарегистрируйтесь, чтобы дочитать`}
                                    promo={promoLock}
                                    user={user}
                                  />
                                  <div className='instruction__stages__section-promo'>
                                    <div className='instruction__promo'>
                                      <div className='instruction__promo__title'>Вы получите полную инструкцию и все необходимые документы:</div>
                                      <div className='instruction__promo__list'>
                                        <div className='instruction__promo__list__item'>акт</div>
                                        <div className='instruction__promo__list__item'>претензия</div>
                                        <div className='instruction__promo__list__item'>исковое</div>
                                      </div>
                                      <div className='instruction__promo__description'>со скидкой до 15 декабря</div>
                                      <div className='instruction__promo__price'>899₽</div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </React.Fragment>
                          );
                        }
                    })}
                  </div>
                ))}
              </div>
          </div>
        );
      }

    return (
      <div className="App">
      {loading && <Loader />}
      {!loading && instruction && 
        <div>
          <span>{instruction.description}</span>
          {renderFilter()}
          {renderStages()}
        </div>
      }
      </div>
    );
}
  
  export default Instruction;