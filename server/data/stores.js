// const storesData = [
//   {
//     Superstore: {
//       locations: {
//         "Abbotsford, BC": {
//           "2855 Gladwin Rd": "1558",
//         },
//         "Airdrie, AB": {
//           "300 Veterans Blvd": "1540",
//         },
//         "Ajax, ON": {
//           "30 Kingston Rd W": "1012",
//         },
//         " Aurora, ON": {
//           "15900 Bayview Ave": "1030",
//         },
//         // "Brandon, MB": {
//         //   "920 Victoria Ave": "1515",
//         // },
//         // " Brockville, ON": {
//         //   "1972 Parkedale Ave": "1017",
//         // },
//         "Burnaby, BC": {
//           "Eaton 4700 Kingsway": "1518",
//         },
//         "Calgary, AB": {
//           "428 6th AVE S": "1590",
//           "3575 20th Ave": "1576",
//           "7005 48th Ave": "1547",
//           "4700 130th Ave": "1546",
//           "5251 Country Hills Blvd": "1575",
//           "100 Country Village Rd": "1543",
//           "20 Heritage Meadows Way": "1539",
//           "15915 Macleod Trail": "1578",
//           "19655 Seton Way": "1586",
//           "5858 Signal Hill Ctr": "1577",
//           "10505 Southport Rd": "1574",
//           "110-3400 69 Street": "3730",
//           "7020 4th St": "1545",
//           "3633 Westwinds Dr": "1542",
//         },
//         // "Campbell River, BC": {
//         //   "1424 Island Hwy": "1524",
//         // },
//         // "Chatham, ON": {
//         //   "791 St Clair St": "0562",
//         // },
//         // "Chilliwack, BC": {
//         //   "45779 Luckakuck Way": "1523",
//         // },
//         "Coquitlam, BC": {
//           "1301 Lougheed Hwy": "1519",
//           "3000 Lougheed Hwy": "1526",
//         },
//         // "Courtenay, BC": {
//         //   "757 Ryan Rd": "1528",
//         // },
//         // "Cranbrook, BC": {
//         //   "2100 17th St N": "1553",
//         // },
//         "Delta, BC": {
//           "8195 120 St": "1554",
//         },
//         // "Duncan, BC": {
//         //   "291 Cowichan Way": "1563",
//         // },
//         "Edmonton, AB": {
//           "9711 23rd Ave NW": "1549",
//           "11835 26 Ave SW ": "1537",
//           "4950 137 Ave NW ": "1566",
//           "12350 137th Ave NW ": "1572",
//           "4821 Calgary Trail ": "1570",
//           "11541 Kingsway Ave ": "1502",
//           "4410 17 St NW ": "1569",
//           "615-54 St SW ": "2555",
//           "17303 Stony Plain Rd ": "1573",
//           "1155 Windermere Way": "1538",
//         },
//         // "Fort McMurray, AB": {
//         //   "9 Haineault St": "1548",
//         // },
//         // "Georgetown, ON": {
//         //   "171 Guelph St": "2811",
//         // },
//         "Grande Prairie, AB": {
//           "12225 99th St": "1544",
//         },
//         // "Grimsby, ON": {
//         //   "361 South Service Rd": "2806",
//         // },
//         "Kanata, ON": {
//           "760 Eagleson Rd": "2813",
//         },
//         "Kamloops, BC": {
//           "910 Columbia St W": "1522",
//         },
//         "Kelowna, BC": {
//           "2280 Baron Rd": "1564",
//         },
//         "Kitchener, ON": {
//           "875 Highland Rd W": "2822",
//         },
//         "Langley, BC": {
//           "19851 Willowbrook Dr": "1561",
//         },
//         // "Leamington, ON": {
//         //   "201 Talbot St E": "0566",
//         // },
//         "Lethbridge, AB": {
//           "3515 Mayor MaGrath Dr S": "1541",
//         },
//         // "Lloydminster, AB": {
//         //   "5031 44th St": "1571",
//         // },
//         "London, ON": {
//           "825 Oxford St E": "1091",
//           "1205 Oxford St": "2812",
//         },
//         "Medicine Hat, AB": {
//           "1792 Trans Canada Way SE": "1550",
//         },
//         // "Midland, ON": {
//         //   "9292 County Rd": "0569",
//         // },
//         "Milton, ON": {
//           "820 Main St E": "2810",
//         },
//         "Mississauga, ON": {
//           "3050 Argentia Rd": "1080",
//           "3045 Mavis Rd": "2841",
//         },
//         "Mission, AB": {
//           "32136 Lougheed Hwy": "1559",
//         },
//         // "Moose Jaw, SK": {
//         //   "30 Thatcher Dr E": "1583",
//         // },
//         "Nanaimo, BC": {
//           "6435 Metral Dr": "1525",
//         },
//         "Newmarket, ON": {
//           "18120 Yonge St": "1018",
//         },
//         "North Vancouver,  BC": {
//           "333 Seymour Blvd": "1560",
//         },
//         "Oakville, ON": {
//           "201 Oak Walk Blvd": "1024",
//         },
//         "Oshawa, ON": {
//           "1385 Harmony Rd N": "1043",
//           "481 Gibb St": "2842",
//         },
//         "Ottawa, ON": {
//           "4270 Innes Rd": "1071",
//           "190 Richmond Rd": "1009",
//         },
//         // "Penticton, BC": {
//         //   "2210 Main St": "1532",
//         // },
//         "Peterborough, ON": {
//           "769 Borden Ave": "2831",
//         },
//         "Pitt Meadows, BC": {
//           "19800 Lougheed Hwy Suite 201": "1555",
//         },
//         // "Prince Albert, SK": {
//         //   "591-15th St E": "1581",
//         // },
//         "Prince George, BC": {
//           "2155 Ferry Ave": "1562",
//         },
//         "Regina, SK": {
//           "15D 3806 Albert St": "1533",
//           "2055 Prince Of Wales Dr": "1584",
//           "4450 Rochdale Blvd": "1585",
//         },
//         "Red Deer, AB": {
//           "A-5016 51 Ave": "1579",
//         },
//         "Richmond, ON": {
//           "4651 No 3 Rd": "1557",
//         },
//         "Sarnia, ON": {
//           "600 Murphy Rd": "2826",
//         },
//         "Saskatoon, SK": {
//           "411 Confederation Dr": "1536",
//           "2901-8th St E": "1535",
//         },
//         "Sherwood Park, AB": {
//           "410 Baseline Rd": "1567",
//         },
//         // "Simcoe, ON": {
//         //   "125 Queensway E": "2818",
//         // },
//         "Spruce Grove, AB": {
//           "110 Jennifer Heil Way": "1565",
//         },
//         "St. Albert, AB": {
//           "101 St Albert Trail": "1568",
//         },
//         "St Catharines, ON": {
//           "411 Louth St": "0577",
//         },
//         // "Steinbach, MB": {
//         //   "130 Provincial Trunk Hwy 12": "1503",
//         // },
//         // "Strathroy, ON": {
//         //   "626 Victoria St": "2823",
//         // },
//         // "St Thomas, ON": {
//         //   "1063 Talbot St, Unit 50": "0551",
//         // },
//         "Sudbury, ON": {
//           "1485 Lasalle Blvd": "2803",
//         },
//         "Surrey, BC": {
//           "14650 104th Ave": "1556",
//           "7550 King George Hwy": "1521",
//           "2332 160th St": "1551",
//         },
//         "Thunder Bay, ON": {
//           "971 Carrick St": "1504",
//         },
//         "Toronto, ON": {
//           "1755 Brimley Rd ": "2809",
//           "825 Don Mills Rd ": "1077",
//           "51 Gerry Fitzgerald Dr ": "1033",
//           "2549 Weston Rd ": "2800",
//         },
//         "Vancouver, BC": {
//           "350 SE Marine Dr": "1517",
//           "3185 Grandview Hwy": "1520",
//         },
//         // "Vernon, BC": {
//         //   "5001 Anderson Way": "1531",
//         // },
//         "Victoria, BC": {
//           "835 Langford Pkwy": "1527",
//         },
//         // "Wasaga Beach, ON": {
//         //   "25-45th St S": "0512",
//         // },
//         "Westbank, BC": {
//           "3020 Louie Dr": "1552",
//         },
//         "Whitby, ON": {
//           "200 Taunton Rd W": "1058",
//         },
//         "Whitehorse, YT": {
//           "2270-2nd Ave": "1530",
//         },
//         "Windsor, ON": {
//           "2430 Dougall Ave": "2827",
//           "4371 Walker Rd": "0567",
//         },
//         "Winnipeg, MB": {
//           "80 Bison Dr ": "1509",
//           "1035 Gateway Rd ": "1512",
//           "550 Kenaston Blvd ": "1516",
//           "2132 Mcphillips St ": "1505",
//           "3193 Portage Ave ": "1508",
//           "1578 Regent Ave W ": "1506",
//           "215 St Anne's Rd ": "1514",
//           "1385 Sargent Ave ": "1511",
//         },
//         // "Yorkton, SK": {
//         //   "206 Broadway St E": "1582",
//         // },
//       },
//     }, //все ок
//   }, //Superstore
//   {
//     Maxi: {
//       locations: {
//         "Montreal, QC": {
//           "10200, boul. Pie IX": "8704",
//           "8570, boul. St-Laurent": "7548", // -
//           "375, rue Jean-Talon O,": "4558",
//           "10455 boul St-Laurent Montreal": "7547",

//           "8305, av. Papineau, Montréal": "8675",
//           "2323, boul. Henri-Bourassa E": "7563", //-
//           "6825, Côte-des-Neiges": "8661",
//           "3185 rue Beaubien E": "7549",

//           "2535, rue Masson": "8632",
//           "4325, rue Jean-Talon E": "8956",
//           "50, av. Mont-Royal O": "7234",
//           "1757, boul. Marcel-Laurin": "8906",

//           "2925, rue Sherbrooke E": "8797",
//           "6750, rue Jean-Talon E": "8673",
//           "6600, St-Jacques O": "7495",
//           "7455, rue Sherbrooke E": "8910",
          
//           "7600, rue Sherbrooke E": "7573",
//           "3000, rue Wellington": "8662",
//           "7605, Maurice-Duplessis": "8386",
//           "6000, boul. Laurendeau": "7550",
//         },
//         "Laval, QC": {
//           "3500, boul. St-Martin O": "8384",
//           "1855, boul. Rene-Laennec": "4552",
//           "2090, boul. des Laurentides": "8976",
//         },
//         "LaSalle, QC": {
//           "6767, boul. Newman": "7557",
//           "7081, Newman": "8994",
//         },
//         "Gatineau, QC": {
//           "25, rue de la Savane": "8667",
//           "22, av. des Flandres": "7572",
//           "800, boul. Maloney O": "8388",
//           "775, boul. St-Joseph": "7212",
//           "381, boul. Maloney E": "7216",
//         },
//         "Aylmer, QC": {
//           "545, ch. Vanier": "8711",
//         },
//         "Hull, QC": {
//           "1, boul. du Plateau": "7566",
//           "300, boul. St-Joseph": "8702",
//         },
//         "Quebec, QC": {
//           "350, rue Bouvier": "8649",
//           "552, boul. Wilfrid-Hamel": "8676",
//           "955, boul. René-Lévesque O": "7552",
//           "5150, boul. de l'Ormiere": "8049",
//           "9550, de l'Ormiere": "4544",
//         },
//         "Lévis, QC": {
//           "6700, rue St-Georges": "7556",
//           "1-7777, boul. Guillaume-Couture": "7225",
//           "50, rte. du President Kennedy, St 190": "8939",
//           "1480 rte des Rivieres": "7957",
//         },
//       },
//     },
//   }, //Maxi
//   {
//     Provigo: {
//       locations: {
//         "Boucherville, QC": {
//           "1001, boul. de Montarville": "7115", //new
//         },
//         "Kirkland, QC": {
//           "16900, rte. Trans-Canada": "7606",
//         },
//         "Longueuil, QC": {
//           "1150, rue King-Georges": "7198",
//         },
//         "Montreal, QC": {
//           "2925, Rachel E": "7288",
//           "42, pl. du Commerce": "8807",
//           "3421, av. du Parc": "7907",

//           "1275, av. des Canadiens de Montréal": "7297",
//           "6485, rue Sherbrooke O": "4772", //changed
//           "1115, boul. Décarie": "8180",
//           "5595, av. Monkland": "8978", //new
          
//           "2386, ch. Lucerne": "7195", //new'
//           "6475, boul. Leger" : "8403", //new
//         },
//         "St-Bruno, QC": {
//           "1150, rue King-Georges": "7293", //new
//         },
//       },
//     },
//   }, //Provigo
//   {
//     "No Frills": {
//       locations: {
//         "Abbotsford, BC": {
//           "34261 Marshall Rd": "6971",
//         },
//         "Airdrie, AB": {
//           "1050 Yankee Valley Rd": "3946",
//         },
//         "Ajax, ON": {
//           "105 Bayly St W": "3688",
//           "87 Williamson Dr W": "9776",
//         },
//         // "Amherstburg, ON": {
//         //   "181 Sandwich St S": "3715",
//         // },
//         // "Bancroft, ON": {
//         //   "127 Hastings St N": "3670",
//         // },
//         "Barrie, ON": {
//           "165 Wellington St W": "7192",
//           "319 Blake St": "3661",
//         },
//         // "Barrington Passage, NS": {
//         //   "3695 Hwy 3": "7206",
//         // },
//         // "Beaumont, AB": {
//         //   "5201 30 Ave": "3995",
//         // },
//         "Brampton, ON": {
//           "9920 Airport Rd": "7137",
//           "700 Balmoral Dr": "7531",
//           "70 Clementine Dr": "0718",
//           "8990 Chinguacousy Rd": "7504",
//           "345 Main St N": "3673",
//           "85 Steeles Ave W": "7518",
//           "295 Queen St E": "7502",
//         },
//         "Brantford, ON": {
//           "603 Colborne St E": "3135",
//           "108 Colborne St W": "3474",
//         },
//         "Burlington, ON": {
//           "571 Brant St": "3686",
//           "2400 Guelph Line": "3143",
//         },
//         "Calgary, AB": {
//           "200-4501 17th Ave SE": "3420",
//           "135 Carrington Plaza": "7146",
//           "14939 Deer Ridge Dr SE": "7235",
//           "10233 Elbow Dr SW": "3155",
//           "882 85th St SW": "3408",
//           "5401 Temple Dr NE": "7655",
//           // "980 Franklin Blvd": "7956", del
//           "870 11st SW": "6969", //new
//           // "1515 King St E": "3149", del
//         },
//         // "Chestermere, AB": {
//         //   "100 Rainbow Rd": "7944",
//         // },
//         // "Chipman, ON": {
//         //   "165 Main St": "7938",
//         // },
//         // "Clarenville, NL": {
//         //   "240 B Memorial Dr": "2713",
//         // },
//         // "Cobourg, ON": {
//         //   "500 Division St": "0291",
//         // },
//         // Cochrane: {
//         //   "210-5th Ave SW": 3982,
//         // },
//         "Coquitlam, BC": {
//           "100-1960 Como Lake Ave": "3968",
//         },
//         "Dartmouth, NS": {
//           "118 Wyse Rd": "2712",
//           "102-375 Pleasant St": "7963", //new
//         },
//         // "Dauphin, MB": {
//         //   "15-1st Ave NE": "3449",
//         // },
//         // "Dawson Creek, BC": {
//         //   "1401 Alaska Ave": "3402",
//         // },
//         // "Dryden, ON": {
//         //   "647 Government St": "7135",
//         // },
//         "East York, ON": {
//           "1150 Victoria Park Ave": "7512",
//         },
//         "Edmonton, AB": {
//           "11405 40th Ave NW": "3422",
//           "10467 80th Ave NW": "3811",
//           "6204 - 90 Ave. NW": "3683",
//           "3425 118th Ave NW": "5457",
//           "1 Londonderry Mall NW": "7147",
//           "403 McConachie Way NW": "3685",
//           "10126 150th St NW": "9474", //changed
//           "15411 - 97th St NW": "3649",
//           "17515 Stony Plain Rd NW": "6930", //new
//           "21546 92 Ave NW": "7530", //new
//         },
//         // "Estevan, SK": {
//         //   "137 King St": "3413",
//         // },
//         "Etobicoke, ON": {
//           "1530 Albion Rd": "7395",
//           "245 Dixon Rd": "3480",
//           "3730 Lakeshore Blvd W": "1306",
//           "748 Queensway": "3659",
//           "460 Renforth Dr": "7227",
//           "220 Royal York Rd": "7508",
//         },
//         // "Fort Saskatchewan, SK": {
//         //   "100-8802 100th St": "3041",
//         // },
//         // "Fort St. John, BC": {
//         //   "9831-98A Ave Unit 1": "3430",
//         // },
//         "Grande Prairie, AB": {
//           "10702 83rd Ave": "7995", //changed
//         },
//         "Guelph,  ON": {
//           "191 Silvercreek Pkwy N": "7503",
//           "35 Harvard Rd": "0793",
//         },
//         "Hamilton, ON": {
//           "435 Main St": "3668",
//           "675 Rymal Rd E": "7236",
//           "770 Upper James Ave": "0723",
//           "1-930 Upper Paradis Rd": "9775", //changed
//           "1-640 Queenston Rd": "3666",
//         },
//         // "High River, AB": {
//         //   "1103 18 St SE": "3669",
//         // },
//         // "Humboldt, SK": {
//         //   "R1-2020 8th Ave": "3608",
//         // },
//         // "Innisfail, AB": {
//         //   "5080 43rd Ave": "7487",
//         // },
//         // "Kenora, ON": {
//         //   "534 Park St": "3657",
//         // },
//         "Kingston, ON": {
//           "1030 Coverdale Dr": "5459",
//           "1162 Division St": "7514",
//         },
//         "Kitchener, ON": {
//           "700 Strasburg Rd": "7542",
//         },
//         "Lethbridge, AB": {
//           "425 13th St N": "7515",
//           "4 Aquitania Blvd W": "3448",
//         },
//         "London, ON": {
//           "332 Wellington Road": "7955",
//           "7 Base Line Rd E": "1302",
//           "1925 Dundas St E": "4012",
//           "599 Fanshawe Park Rd W": "3664",
//           "1275 Highbury Ave": "3117",
//           "960 Hamilton Road": "3679",
//           "635 Southdale Road E": "3728",
//           "1-925 Southdale Rd W": "0266",
//         },
//         "Maple Ridge, BC": {
//           "22427 Dewdney Trunk Rd": "3604",
//         },
//         "Markham, ON": {
//           "7075 Markham Rd": "3646",
//           "5762 Hwy 7 E": "7505",
//           "9305 Hwy 48 RR 1": "3139",
//           "8601 Warden Ave": "7076",
//         },
//         "Milton, ON": {
//           "6520 Derry Rd": "3457",
//         },
//         "Mississauga, ON": {
//           "325 Central Pkwy W": "7961", //new
//           "2150 Burnhamthorpe Rd W": "7527",
//           "6085 Creditview Rd": "3907",
//           "620 Eglinton Ave W": "1356",
//           "6435 Erin Mills Pkwy": "7934",
//           "7070 McLaughlin Rd": "3619",
//           "925 Rathburn Rd E": "0758",
//           "1250 South Service Rd": "7415",
//           "680 Silver Creek Blvd": "7578",
//         },
//         "Nepean, ON": {
//           "200 Grant Carman": "7942",
//         },
//         // "Newcastle, ON": {
//         //   "80 King Ave W": "3476",
//         // },
//         "Newmarket, ON": {
//           "17255 Leslie St": "3621",
//           "50 Davis Dr": "3049",
//         },
//         "Niagara Falls, ON": {
//           "6460 Lundy's Lane": "3134",
//         },
//         // "Nipawin, SK": {
//         //   "101 Railway Ave W": "3153",
//         // },
//         // "Nobleton, ON": {
//         //   "13255 Hwy 27": "7498",
//         // },
//         "North York, ON": {
//           "3555 Don Mills Road": "3631",
//           "1641 Jane St": "3494",
//           "3685 Keele St": "7954", //changed
//           "1450 Lawrence Ave E": "7026",
//           "6220 Yonge St": "3925",
//           "1 York Gate Blvd": "3140",
//           "270 Wilson Ave": "3717",
//         },
//         // "North Battleford, SK": {
//         //   "11430 Railway Ave E": "7077",
//         // },
//         "North Bay, ON": {
//           "300 Lakeshore Dr": "0703",
//           "975 Mckeown Ave": "7191", //added from North York
//         },
//         "Oakville, ON": {
//           "1395 Abbeywood Dr": "3150",
//         },
//         // "Orillia, ON": {
//         //   "8-1029 Brodie Dr": "0704",
//         // },
//         "Oshawa, ON": {
//           "151 Bloor St E": "0262",
//           "1300 King St E": "7532",
//           "200 Ritson Rd N": "3916",
//           "1050 Simcoe St N": "7182",
//         },
//         "Ottawa, ON": {
//           "2681 Alta Vista Dr": "7943",
//           "1226 Place D'Orleans Dr": "6962", //changed
//         },
//         // "Owen Sound, ON": {
//         //   "1020 10th St W": "7188",
//         // },
//         "Paradise, NL": {
//           "1300 Topsail Rd": "3355",
//         },
//         // "Paris, ON": {
//         //   "71 Dundas St E": "7229",
//         // },
//         // "Peace River, AB": {
//         //   "7613 100th Ave": "3633",
//         // },
//         // "Pembroke, ON": {
//         //   "1200 Pembroke St W": "3677",
//         // },
//         "Peterborough, ON": {
//           "230 George St N": "3142",
//           "1866 Lansdowne St W": "3634",
//         },
//         "Pickering, ON": {
//           "1725 Kingston Rd": "3616",
//         },
//         // "Ponoka, ON": {
//         //   "5561 Hwy 53": "3352",  //needed to be deleted
//         // },
//         // "Port Alberni, BC": {
//         //   "3455 Johnston Rd": "3417",
//         // },
//         "Port Coquitlam, BC": {
//           "2110-1971 Lougheed Hwy": "3433",
//         },
//         // "Port Dover, ON": {
//         //   "87 Thompson Dr SS1": "0763",
//         // },
//         "Regina, SK": {
//           "5000 - 4th Ave": "3978",
//         },
//         "Richmond Hill, ON": {
//           "9325 Yonge St": "0770",
//           "10909 Yonge St": "3771",
//         },
//         "Saskatoon, SK": {
//           "1-7 Assiniboine Dr.": "3732",
//           "2410-22nd St W": "7579",
//           "1018 Taylor St E": "3437",
//         },
//         "Scarborough, ON": {
//           "1880 Eglinton Ave E": "3636",
//           "2430 Eglinton Ave E": "7138",
//           "2742 Eglinton Ave E": "3468",
//           "70 Island Rd": "3698",
//           "2471 Kingston Rd": "1346",
//           "4473 Kingston Rd": "7544",
//           "3401 Lawrence Ave E": "3924",
//           "3850 Sheppard Ave E": "1399",
//           "681 Silver Star Blvd": "3675",
//         },
//         "St. Catharines, ON": {
//           "525 Welland Ave": "7496",
//           "581 Lake St": "0743",
//         },
//         "Stratford, ON": {
//           "25 Hopeton Rd": "3801",
//           "618 Huron St": "3478",
//         },
//         "Surrey, BC": {
//           "17710 56 Ave": "3439",
//           "12852 96 Ave, 108": "3419",
//           "15355 Fraser Hwy": "3240",
//         },
//         "Sydney, NS": {
//           "332 Welton St": "7177",
//         },
//         // "Sylvan Lake, AB": {
//         //   "70 Hewlett Park Landing": "3441",
//         // },
//         "Toronto, ON": {
//           "1811 Avenue Rd": "7936",
//           "243 Alberta Ave": "3640",
//           "345 Bloor St E": "7911",
//           "2187 Bloor St W": "1376",
//           "720 Broadview Ave": "7937",
//           "269 Coxwell Avenue": "3931",
//           "900 Dufferin St": "7411",
//           "1951 Eglinton Ave W": "7087",
//           "200 Front St E": "3643",
//           "42 Hanna Ave": "7964",
//           "1020 Islington Ave": "0753",
//           "1022 King St W": "7941",
//           "1435 King St W": "3680",
//           "222 Lansdowne Ave": "3695",
//           "360 McLevin Ave": "3132",
//           "372 Pacific Ave": "7921",
//           "25 Photography Dr": "3663",
//           "449 Parliament St": "7047",
//           "1591 Wilson Ave": "0705",
//           "1591 Wilson Ave": "7509",
//         },
//         // "The Pas, MB": {
//         //   "#12 Highway 10 North": "3733",
//         // },
//         "Thunder Bay, ON": {
//           "1020 Dawson Rd": "3450",
//           "1 - 425 Edward St N": "3969",
//         },
//         "Vancouver, BC": {
//           "1688 4th Ave W": "3807",
//           "130-2083 Alma St": "3671",
//           "101 - 1030 Denman St": "3641",
//           "1460 Hastings St E": "3354",
//           "4508 Fraser St": "3410",
//           "310 W Broadway": "3403",
//         },
//         "Vaughan, ON": {
//           "1054 Centre St.": "3660",
//           "1631 Rutherford Rd": "3131",
//           "3800 Rutherford Rd Bldg C": "7444",
//         },
//         // "Vegreville, AB": {
//         //   "4734 50th Ave": "3655",
//         // },
//         "Waterdown, ON": {
//           "36 Clappison Ave": "3114",
//         },
//         "Waterloo, ON": {
//           "24 Forwell Creek": "7181",
//         },
//         // "Wainwright, AB": {
//         //   "2601 14 Ave": "7966",
//         // },
//         // "Wetaskiwin, AB": {
//         //   "5217 50th Ave": "3603",
//         // },
//         "Whitby, ON": {
//           "2-3100 Garden St": "7032",
//           "3555 Thickson Rd N": "3145",
//           "920 Dundas St W": "7166",
//         },
//         "Windsor, ON": {
//           "3975 Wyandotte St E": "3152",
//         },
//         "Winnipeg, MB": {
//           "161 Goulet St": "7151",
//           "1795 Henderson Highway": "7507",
//           "1445 Main St": "3442",
//           "600 Notre Dame Ave": "7141",
//           "1500 Plessis Rd.": "7158",
//           "6650 Roblin Blvd": "3647",
//           "740 St. Anne’s Rd": "7074",
//           "677 Stafford St.": "5456",
//         },
//         "Woodbridge, ON": {
//           "5731 Hwy 7": "3490",
//         },
//       },
//     },
//   }, //Nofrills

//   {
//     Fortinos: {
//       locations: {
//         "Ancaster, ON": {
//           "54 Wilson St W": "0086",
//         },
//         "Bolton, ON": {
//           "487 Queen St S": "7513",
//         },
//         "Brampton, ON": {
//           "55 Mountainash Road": "0039",
//           "60 Quarry Edge Drive": "5548",
//           "35 Worthington Ave": "7529",
//         },
//         "Burlington, ON": {
//           "1059 Plains Rd E": "0078",
//           "2025 Guelph Line": "0526",
//           "2515 Appleby Line": "1495",
//           "5111 New St": "2268",
//         },
//         "Hamilton, ON": {
//           "75 Centennial Pkwy North": "0300",
//           "B-50 Dundurn St S": "2265",
//           "65 Mall Rd": "0048",
//           "1579 Main St W": "0067",
//           "1550 Upper James St": "0065",
//         },
//         "Oakville, ON": {
//           "173 Lakeshore Rd W": "7136",
//           "493 Dundas St W": "0199",
//         },
//         "Stoney Creek, ON": {
//           "102 Hwy 8": "7346",
//           "21 Upper Centennial Pky S": "0046",
//         },
//         "Etobicoke, ON": {
//           "330 Queen's Plate Dr": "7920",
//         },
//         "North York, ON": {
//           "700 Lawrence Ave W": "1436",
//         },
//         "Vaughan, ON": {
//           "2911 Major MacKenzie Dr": "5547",
//           "3940 Hwy 7 RR 2": "0096",
//         },
//         "Woodbridge, ON": {
//           "8585 Hwy 27, RR3": "0055",
//         },
//       },
//     },
//   }, //Fortinos
//   // {
//   //   "Food Basics": {
//   //     locations: {
//   //       "Ancaster, ON": {
//   //         "54 Wilson": "1235",
//   //       },
//   //       "Bolton, ON": {
//   //         "5ddpepd4 Wilson": "1236",
//   //       },
//   //     },
//   //   },
//   // },
//   {
//     Metro: {
//       locations: {
//         "Toronto, ON": {
//           "656 Eglinton Ave. E": "1234",
//           "425 Bloor St. W": "2",
//           "735 College St.": "3",
//           "444 Yonge St.": "4",
//           "3003 Danforth Ave.": "5",
//           "80 Front St. East": "6",
//           "89 Gould St.": "7",
//           "100 Lynn Williams St.": "8",
//           "2155 St. Clair Ave. W": "9",
//           "201-1230 Queen Street West": "10",
//           "2300 Yonge St.": "11",
//           "3142 Yonge St.": "12",
//         },
//       },
//     },
//   },

//   {
//     Loblaws: {
//       locations: {
//         // "Bowmanville, ON": { "2375 Hwy 2": "1064" },
//         // "Collingwood, ON": { "12 Hurontario St": "1127" },
//         "Edmonton, AB": {
//           "101-12060 104th Ave NW": "7309",
//           "10308 103 ST NW": "4429",
//         },
//         "Etobicoke, ON": { "380 The East Mall": "1066" },
//         "Kingston, ON": {
//           "1048 Midland Ave": "1083",
//           "1100 Princess St": "1040",
//         },
//         // "Lindsay, ON": { "400 Kent St W": "1022" },
//         "London, ON": {
//           "1740 Richmond St N": "1027",
//           "3040 Wonderland Rd S": "1016",
//         },
//         "Markham, ON": { "200 Bullock Dr": "1032" },
//         "Mississauga, ON": {
//           "5010 Glen Erin Dr": "1011",
//           "250 Lakeshore Rd W": "1090",
//           "5970 Mclaughlin Rd": "1003",
//         },
//         "Nepean, ON": { "1460 Merivale Rd": "1082" },
//         "North Vancouver, BC": { "1650 Lonsdale Ave": "7534" },
//         "North York, ON": {
//           "3501 Yonge St": "1194",
//           "5095 Yonge St": "1010",
//         },
//         "Ottawa, ON": {
//           "2210 Bank St": "1188",
//           "1980 Baseline Rd": "1050",
//           "2085 Carling Ave": "1132",
//           "200 Earl Grey Dr": "1114",
//           "3201 Greenbank Rd": "1035",
//           "64 Isabella St": "1095",
//           "100 McArthur Rd": "1014",
//           "1980 Ogilvie Rd": "1051",
//           "363 Rideau St": "1170",
//           "2065A Robertson Rd": "1023",
//         },
//         "Pickering, ON": { "1792 Liverpool Rd": "1001" },
//         "Richmond Hill, ON": { "301 High Tech Rd": "1028" },
//         "Toronto, ON": {
//           "15A Bathurst Street": "1424",
//           "2877 Bayview Village": "1019",
//           "60 Carlton St": "1007",
//           "2280 Dundas St W": "1154",
//           "3671 Dundas St W": "1099",
//           "650 Dupont St": "1029",
//           "1-101 Eglinton Ave E": "1020",
//           "17 Leslie St": "1004",
//           "10 Lower Jarvis St": "1079",
//           "301 Moore Ave": "1155",
//           "50 Musgrave St": "1021",
//           "585 Queen St W": "1000",
//           "11 Redway Rd": "1092",
//           "12 St Clair Ave E": "1142",
//           "396 St Clair Ave W": "1212",
//         },
//         "Vancouver, BC": {
//           "3185 Arbutus St": "7491",
//           "658 Homer St": "7155",
//         },
//         "West Vancouver, BC": { "861-845 Park Royal N": "7494" },
//       },
//     },
//   }, //Loblaws
//   {
//     Zehrs: {
//       locations: {
//         // "Alliston, ON": {
//         //   "30 King St S": "0509",
//         // },
//         "Barrie, ON": {
//           "472 Bayfield St": "6583",
//           "11 Bryne Dr": "0507",
//           "607 Cundles Rd E": "0514",
//           "620 Yonge St": "0565",
//         },
//         "Bradford, ON": {
//           "500 Holland St W": "0505",
//         },
//         "Brantford, ON": {
//           "410 Fairview Dr": "0540",
//           "290 King George Rd N": "0543",
//         },
//         // "Caledonia, ON": {
//         //   "322 Zehrs Argyle St S": "0519",
//         // },
//         "Cambridge, ON": {
//           "400 Conestoga Blvd": "0533",
//           "180 Holiday Inn Dr": "0545",
//           "200 Franklin Blvd": "0576",
//         },
//         // "Fergus, ON": {
//         //   "800 Tower St S": "0539",
//         // },
//         // "Goderich, ON": {
//         //   "35400D Huron Road": "0532",
//         // },
//         "Guelph,  ON": {
//           "124 Clair Rd E": "0500",
//           "297 Eramosa Rd": "0538",
//           "160 Kortright Road W": "0531",
//           "1045 Paisley Rd": "0559",
//         },
//         // "Keswick, ON": {
//         //   "24018 Woodbine Ave Rr 2": "0520",
//         // },
//         // "Kingsville, ON": {
//         //   "300 Main St E": "0572",
//         // },
//         "Kitchener, ON": {
//           "1005 Ottawa St N": "0523",
//           "750 Ottawa St S": "0560",
//           "123 Pioneer Pk": "0530",
//           "1375 Weber St E": "0515",
//         },
//         // "Listowel, ON": {
//         //   "600 Mitchell Rd Hwy 23 S": "0535",
//         // },
//         "Niagara Falls, ON": {
//           "6940 Morrison St": "0537",
//         },
//         // "Orangeville, ON": {
//         //   "50-Heritage Mall 4th Ave": "0554",
//         // },
//         // "Owen Sound, ON": {
//         //   "1150 16th St E": "0563",
//         // },
//         // "Orillia, ON": {
//         //   "289 Coldwater Road": "0580",
//         // },
//         "St. Catharines, ON": {
//           "285 Geneva St": "0536",
//           "221 Glendale Ave": "0522",
//         },
//         "Stratford, ON": {
//           "865 Ontario St": "0557",
//         },
//         // "Tecumseh, ON": {
//         //   "400 Manning Rd": "0573",
//         // },
//         // "Tillsonburg, ON": {
//         //   "400 Simcoe St": "0570",
//         // },
//         // "Uxbridge, ON": {
//         //   "323 Toronto St S": "0552",
//         // },
//         "Waterloo, ON": {
//           "555 Davenport Rd": "0528",
//           "450 Erb St W": "0524",
//           "315 Lincoln Rd": "0525",
//         },
//         "Welland, ON": {
//           "821 Niagara St": "0550",
//         },
//         "Windsor, ON": {
//           "5890 Malden Rd": "0521",
//           "7201 Tecumseh Rd E": "0529",
//         },
//         // "Woodstock, ON": {
//         //   "969 Dundas Street": "0579",
//         // },
//       },
//     },
//   }, //Zehrs
// ];


const storesData = [
  {
    "Abbotsford, BC": {
      locations: {
        Superstore: {
          "2855 Gladwin Rd": "1558",
        },
        "No Frills": {
          "34261 Marshall Rd": "6971",
        },
      },
    },
  },
  {
    "Airdrie, AB": {
      locations: {
        Superstore: {
          "300 Veterans Blvd": "1540",
        },
        "No Frills": {
          "1050 Yankee Valley Rd": "3946",
        },
      },
    },
  },
  {
    "Ajax, ON": {
      locations: {
        Superstore: {
          "30 Kingston Rd W": "1012",
        },
        "No Frills": {
          "105 Bayly St W": "3688",
          "87 Williamson Dr W": "9776",
        },
      },
    },
  },
  {
    "Aurora, ON": {
      locations: {
        Superstore: {
          "15900 Bayview Ave": "1030",
        },
      },
    },
  },
  {
    "Aylmer, QC": {
      locations: {
        Maxi: {
          "545, ch. Vanier": "8711",
        },
      },
    },
  },
  {
    "Ancaster, ON": {
      locations: {
        Fortinos: {
          "54 Wilson St W": "0086",
        },
      },
    },
  },
  {
    "Barrie, ON": {
      locations: {
        "No Frills": {
          "165 Wellington St W": "7192",
          "319 Blake St": "3661",
        },
        Zehrs: {
          "472 Bayfield St": "6583",
          "11 Bryne Dr": "0507",
          "607 Cundles Rd E": "0514",
          "620 Yonge St": "0565",
        },
      },
    },
  },
  {
    "Bolton, ON": {
      locations: {
        Fortinos: {
          "487 Queen St S": "7513",
        },
      },
    },
  },
  {
    "Boucherville, QC": {
      locations: {
        Provigo: {
          "1001, boul. de Montarville": "7115",
        },
      },
    },
  },
  {
    "Bradford, ON": {
      locations: {
        Zehrs: {
          "500 Holland St W": "0505",
        },
      },
    },
  },
  {
    "Brampton, ON": {
      locations: {
        "No Frills": {
          "9920 Airport Rd": "7137",
          "700 Balmoral Dr": "7531",
          "70 Clementine Dr": "0718",
          "8990 Chinguacousy Rd": "7504",
          "345 Main St N": "3673",
          "85 Steeles Ave W": "7518",
          "295 Queen St E": "7502",
        },
        Fortinos: {
          "55 Mountainash Road": "0039",
          "60 Quarry Edge Drive": "5548",
          "35 Worthington Ave": "7529",
        },
      },
    },
  },
  {
    "Brantford, ON": {
      locations: {
        "No Frills": {
          "603 Colborne St E": "3135",
          "108 Colborne St W": "3474",
        },
        Zehrs: {
          "410 Fairview Dr": "0540",
          "290 King George Rd N": "0543",
        },
      },
    },
  },
  {
    "Burnaby, BC": {
      locations: {
        Superstore: {
          "Eaton 4700 Kingsway": "1518",
        },
      },
    },
  },
  {
    "Burlington, ON": {
      locations: {
        "No Frills": {
          "571 Brant St": "3686",
          "2400 Guelph Line": "3143",
        },
        Fortinos: {
          "1059 Plains Rd E": "0078",
          "2025 Guelph Line": "0526",
          "2515 Appleby Line": "1495",
          "5111 New St": "2268",
        },
      },
    },
  },
  {
    "Calgary, AB": {
      locations: {
        Superstore: {
          "428 6th AVE S": "1590",
          "3575 20th Ave": "1576",
          "7005 48th Ave": "1547",
          "4700 130th Ave": "1546",
          "5251 Country Hills Blvd": "1575",
          "100 Country Village Rd": "1543",
          "20 Heritage Meadows Way": "1539",
          "15915 Macleod Trail": "1578",
          "19655 Seton Way": "1586",
          "5858 Signal Hill Ctr": "1577",
          "10505 Southport Rd": "1574",
          "110-3400 69 Street": "3730",
          "7020 4th St": "1545",
          "3633 Westwinds Dr": "1542",
        },
        "No Frills": {
          "200-4501 17th Ave SE": "3420",
          "135 Carrington Plaza": "7146",
          "14939 Deer Ridge Dr SE": "7235",
          "10233 Elbow Dr SW": "3155",
          "882 85th St SW": "3408",
          "5401 Temple Dr NE": "7655",
          "870 11st SW": "6969",
        },
      },
    },
  },
  {
    "Cambridge, ON": {
      locations: {
        Zehrs: {
          "400 Conestoga Blvd": "0533",
          "180 Holiday Inn Dr": "0545",
          "200 Franklin Blvd": "0576",
        },
      },
    },
  },
  {
    "Coquitlam, BC": {
      locations: {
        Superstore: {
          "1301 Lougheed Hwy": "1519",
          "3000 Lougheed Hwy": "1526",
        },
        "No Frills": {
          "100-1960 Como Lake Ave": "3968",
        },
      },
    },
  },
  {
    "Dartmouth, NS": {
      locations: {
        "No Frills": {
          "118 Wyse Rd": "2712",
          "102-375 Pleasant St": "7963",
        },
      },
    },
  },
  {
    "Delta, BC": {
      locations: {
        Superstore: {
          "8195 120 St": "1554",
        },
      },
    },
  },
  {
    "East York, ON": {
      locations: {
        "No Frills": {
          "1150 Victoria Park Ave": "7512",
        },
      },
    },
  },
  {
    "Edmonton, AB": {
      locations: {
        Superstore: {
          "9711 23rd Ave NW": "1549",
          "11835 26 Ave SW ": "1537",
          "4950 137 Ave NW ": "1566",
          "12350 137th Ave NW ": "1572",
          "4821 Calgary Trail ": "1570",
          "11541 Kingsway Ave ": "1502",
          "4410 17 St NW ": "1569",
          "615-54 St SW ": "2555",
          "17303 Stony Plain Rd ": "1573",
          "1155 Windermere Way": "1538",
        },
        "No Frills": {
          "11405 40th Ave NW": "3422",
          "10467 80th Ave NW": "3811",
          "6204 - 90 Ave. NW": "3683",
          "3425 118th Ave NW": "5457",
          "1 Londonderry Mall NW": "7147",
          "403 McConachie Way NW": "3685",
          "10126 150th St NW": "9474",
          "15411 - 97th St NW": "3649",
          "17515 Stony Plain Rd NW": "6930",
          "21546 92 Ave NW": "7530",
        },
        Loblaws: {
          "101-12060 104th Ave NW": "7309",
          "10308 103 ST NW": "4429",
        },
      },
    },
  },
  {
    "Etobicoke, ON": {
      locations: {
        "No Frills": {
          "1530 Albion Rd": "7395",
          "245 Dixon Rd": "3480",
          "3730 Lakeshore Blvd W": "1306",
          "748 Queensway": "3659",
          "460 Renforth Dr": "7227",
          "220 Royal York Rd": "7508",
        },
        Fortinos: {
          "330 Queen's Plate Dr": "7920",
        },
        Loblaws: {
          "380 The East Mall": "1066",
        },
      },
    },
  },
  {
    "Gatineau, QC": {
      locations: {
        Maxi: {
          "25, rue de la Savane": "8667",
          "22, av. des Flandres": "7572",
          "800, boul. Maloney O": "8388",
          "775, boul. St-Joseph": "7212",
          "381, boul. Maloney E": "7216",
        },
      },
    },
  },
  {
    "Grande Prairie, AB": {
      locations: {
        Superstore: {
          "12225 99th St": "1544",
        },
        "No Frills": {
          "10702 83rd Ave": "7995",
        },
      },
    },
  },
  {
    "Guelph, ON": {
      locations: {
        "No Frills": {
          "191 Silvercreek Pkwy N": "7503",
          "35 Harvard Rd": "0793",
        },
        Zehrs: {
          "124 Clair Rd E": "0500",
          "297 Eramosa Rd": "0538",
          "160 Kortright Road W": "0531",
          "1045 Paisley Rd": "0559",
        },
      },
    },
  },
  {
    "Hamilton, ON": {
      locations: {
        "No Frills": {
          "435 Main St": "3668",
          "675 Rymal Rd E": "7236",
          "770 Upper James Ave": "0723",
          "1-930 Upper Paradis Rd": "9775",
          "1-640 Queenston Rd": "3666",
        },
        Fortinos: {
          "75 Centennial Pkwy North": "0300",
          "B-50 Dundurn St S": "2265",
          "65 Mall Rd": "0048",
          "1579 Main St W": "0067",
          "1550 Upper James St": "0065",
        },
      },
    },
  },
  {
    "Hull, QC": {
      locations: {
        Maxi: {
          "1, boul. du Plateau": "7566",
          "300, boul. St-Joseph": "8702",
        },
      },
    },
  },
  {
    "Kamloops, BC": {
      locations: {
        Superstore: {
          "910 Columbia St W": "1522",
        },
      },
    },
  },
  {
    "Kanata, ON": {
      locations: {
        Superstore: {
          "760 Eagleson Rd": "2813",
        },
      },
    },
  },
  {
    "Kelowna, BC": {
      locations: {
        Superstore: {
          "2280 Baron Rd": "1564",
        },
      },
    },
  },
  {
    "Kingston, ON": {
      locations: {
        "No Frills": {
          "1030 Coverdale Dr": "5459",
          "1162 Division St": "7514",
        },
        Loblaws: {
          "1048 Midland Ave": "1083",
          "1100 Princess St": "1040",
        },
      },
    },
  },
  {
    "Kirkland, QC": {
      locations: {
        Provigo: {
          "16900, rte. Trans-Canada": "7606",
        },
      },
    },
  },
  {
    "Kitchener, ON": {
      locations: {
        Superstore: {
          "875 Highland Rd W": "2822",
        },
        "No Frills": {
          "700 Strasburg Rd": "7542",
        },
        Zehrs: {
          "1005 Ottawa St N": "0523",
          "750 Ottawa St S": "0560",
          "123 Pioneer Pk": "0530",
          "1375 Weber St E": "0515",
        },
      },
    },
  },
  {
    "Langley, BC": {
      locations: {
        Superstore: {
          "19851 Willowbrook Dr": "1561",
        },
      },
    },
  },
  {
    "LaSalle, QC": {
      locations: {
        Maxi: {
          "6767, boul. Newman": "7557",
          "7081, Newman": "8994",
        },
      },
    },
  },
  {
    "Laval, QC": {
      locations: {
        Maxi: {
          "3500, boul. St-Martin O": "8384",
          "1855, boul. Rene-Laennec": "4552",
          "2090, boul. des Laurentides": "8976",
        },
      },
    },
  },
  {
    "Lethbridge, AB": {
      locations: {
        Superstore: {
          "3515 Mayor MaGrath Dr S": "1541",
        },
        "No Frills": {
          "425 13th St N": "7515",
          "4 Aquitania Blvd W": "3448",
        },
      },
    },
  },
  {
    "Lévis, QC": {
      locations: {
        Maxi: {
          "6700, rue St-Georges": "7556",
          "1-7777, boul. Guillaume-Couture": "7225",
          "50, rte. du President Kennedy, St 190": "8939",
          "1480 rte des Rivieres": "7957",
        },
      },
    },
  },
  {
    "London, ON": {
      locations: {
        Superstore: {
          "825 Oxford St E": "1091",
          "1205 Oxford St": "2812",
        },
        "No Frills": {
          "332 Wellington Road": "7955",
          "7 Base Line Rd E": "1302",
          "1925 Dundas St E": "4012",
          "599 Fanshawe Park Rd W": "3664",
          "1275 Highbury Ave": "3117",
          "960 Hamilton Road": "3679",
          "635 Southdale Road E": "3728",
          "1-925 Southdale Rd W": "0266",
        },
        Loblaws: {
          "1740 Richmond St N": "1027",
          "3040 Wonderland Rd S": "1016",
        },
      },
    },
  },
  {
    "Longueuil, QC": {
      locations: {
        Provigo: {
          "1150, rue King-Georges": "7198",
        },
      },
    },
  },
  {
    "Maple Ridge, BC": {
      locations: {
        "No Frills": {
          "22427 Dewdney Trunk Rd": "3604",
        },
      },
    },
  },
  {
    "Markham, ON": {
      locations: {
        "No Frills": {
          "7075 Markham Rd": "3646",
          "5762 Hwy 7 E": "7505",
          "9305 Hwy 48 RR 1": "3139",
          "8601 Warden Ave": "7076",
        },
        Loblaws: {
          "200 Bullock Dr": "1032",
        },
      },
    },
  },
  {
    "Medicine Hat, AB": {
      locations: {
        Superstore: {
          "1792 Trans Canada Way SE": "1550",
        },
      },
    },
  },
  {
    "Milton, ON": {
      locations: {
        Superstore: {
          "820 Main St E": "2810",
        },
        "No Frills": {
          "6520 Derry Rd": "3457",
        },
      },
    },
  },
  {
    "Mission, AB": {
      locations: {
        Superstore: {
          "32136 Lougheed Hwy": "1559",
        },
      },
    },
  },
  {
    "Mississauga, ON": {
      locations: {
        Superstore: {
          "3050 Argentia Rd": "1080",
          "3045 Mavis Rd": "2841",
        },
        "No Frills": {
          "325 Central Pkwy W": "7961",
          "2150 Burnhamthorpe Rd W": "7527",
          "6085 Creditview Rd": "3907",
          "620 Eglinton Ave W": "1356",
          "6435 Erin Mills Pkwy": "7934",
          "7070 McLaughlin Rd": "3619",
          "925 Rathburn Rd E": "0758",
          "1250 South Service Rd": "7415",
          "680 Silver Creek Blvd": "7578",
        },
        Loblaws: {
          "5010 Glen Erin Dr": "1011",
          "250 Lakeshore Rd W": "1090",
          "5970 Mclaughlin Rd": "1003",
        },
      },
    },
  },
  {
    "Montreal, QC": {
      locations: {
        Maxi: {
          "10200, boul. Pie IX": "8704",
          "8570, boul. St-Laurent": "7548",
          "375, rue Jean-Talon O,": "4558",
          "10455 boul St-Laurent Montreal": "7547",
          "8305, av. Papineau, Montréal": "8675",
          "2323, boul. Henri-Bourassa E": "7563",
          "6825, Côte-des-Neiges": "8661",
          "3185 rue Beaubien E": "7549",
          "2535, rue Masson": "8632",
          "4325, rue Jean-Talon E": "8956",
          "50, av. Mont-Royal O": "7234",
          "1757, boul. Marcel-Laurin": "8906",
          "2925, rue Sherbrooke E": "8797",
          "6750, rue Jean-Talon E": "8673",
          "6600, St-Jacques O": "7495",
          "7455, rue Sherbrooke E": "8910",
          "7600, rue Sherbrooke E": "7573",
          "3000, rue Wellington": "8662",
          "7605, Maurice-Duplessis": "8386",
          "6000, boul. Laurendeau": "7550",
        },
        Provigo: {
          "2925, Rachel E": "7288",
          "42, pl. du Commerce": "8807",
          "3421, av. du Parc": "7907",
          "1275, av. des Canadiens de Montréal": "7297",
          "6485, rue Sherbrooke O": "4772",
          "1115, boul. Décarie": "8180",
          "5595, av. Monkland": "8978",
          "2386, ch. Lucerne": "7195",
          "6475, boul. Leger": "8403",
        },
      },
    },
  },
  {
    "Nanaimo, BC": {
      locations: {
        Superstore: {
          "6435 Metral Dr": "1525",
        },
      },
    },
  },
  {
    "Nepean, ON": {
      locations: {
        "No Frills": {
          "200 Grant Carman": "7942",
        },
        Loblaws: {
          "1460 Merivale Rd": "1082",
        },
      },
    },
  },
  {
    "Newmarket, ON": {
      locations: {
        Superstore: {
          "18120 Yonge St": "1018",
        },
        "No Frills": {
          "17255 Leslie St": "3621",
          "50 Davis Dr": "3049",
        },
      },
    },
  },
  {
    "Niagara Falls, ON": {
      locations: {
        "No Frills": {
          "6460 Lundy's Lane": "3134",
        },
        Zehrs: {
          "6940 Morrison St": "0537",
        },
      },
    },
  },
  {
    "North Bay, ON": {
      locations: {
        "No Frills": {
          "300 Lakeshore Dr": "0703",
          "975 Mckeown Ave": "7191",
        },
      },
    },
  },
  {
    "North Vancouver, BC": {
      locations: {
        Superstore: {
          "333 Seymour Blvd": "1560",
        },
        Loblaws: {
          "1650 Lonsdale Ave": "7534",
        },
      },
    },
  },
  {
    "North York, ON": {
      locations: {
        "No Frills": {
          "3555 Don Mills Road": "3631",
          "1641 Jane St": "3494",
          "3685 Keele St": "7954",
          "1450 Lawrence Ave E": "7026",
          "6220 Yonge St": "3925",
          "1 York Gate Blvd": "3140",
          "270 Wilson Ave": "3717",
        },
        Fortinos: {
          "700 Lawrence Ave W": "1436",
        },
        Loblaws: {
          "3501 Yonge St": "1194",
          "5095 Yonge St": "1010",
        },
      },
    },
  },
  {
    "Oakville, ON": {
      locations: {
        Superstore: {
          "201 Oak Walk Blvd": "1024",
        },
        "No Frills": {
          "1395 Abbeywood Dr": "3150",
        },
        Fortinos: {
          "173 Lakeshore Rd W": "7136",
          "493 Dundas St W": "0199",
        },
      },
    },
  },
  {
    "Oshawa, ON": {
      locations: {
        Superstore: {
          "1385 Harmony Rd N": "1043",
          "481 Gibb St": "2842",
        },
        "No Frills": {
          "151 Bloor St E": "0262",
          "1300 King St E": "7532",
          "200 Ritson Rd N": "3916",
          "1050 Simcoe St N": "7182",
        },
      },
    },
  },
  {
    "Ottawa, ON": {
      locations: {
        Superstore: {
          "4270 Innes Rd": "1071",
          "190 Richmond Rd": "1009",
        },
        "No Frills": {
          "2681 Alta Vista Dr": "7943",
          "1226 Place D'Orleans Dr": "6962",
        },
        Loblaws: {
          "2210 Bank St": "1188",
          "1980 Baseline Rd": "1050",
          "2085 Carling Ave": "1132",
          "200 Earl Grey Dr": "1114",
          "3201 Greenbank Rd": "1035",
          "64 Isabella St": "1095",
          "100 McArthur Rd": "1014",
          "1980 Ogilvie Rd": "1051",
          "363 Rideau St": "1170",
          "2065A Robertson Rd": "1023",
        },
      },
    },
  },
  {
    "Paradise, NL": {
      locations: {
        "No Frills": {
          "1300 Topsail Rd": "3355",
        },
      },
    },
  },
  {
    "Peterborough, ON": {
      locations: {
        Superstore: {
          "769 Borden Ave": "2831",
        },
        "No Frills": {
          "230 George St N": "3142",
          "1866 Lansdowne St W": "3634",
        },
      },
    },
  },
  {
    "Pickering, ON": {
      locations: {
        "No Frills": {
          "1725 Kingston Rd": "3616",
        },
        Loblaws: {
          "1792 Liverpool Rd": "1001",
        },
      },
    },
  },
  {
    "Pitt Meadows, BC": {
      locations: {
        Superstore: {
          "19800 Lougheed Hwy Suite 201": "1555",
        },
      },
    },
  },
  {
    "Port Coquitlam, BC": {
      locations: {
        "No Frills": {
          "2110-1971 Lougheed Hwy": "3433",
        },
      },
    },
  },
  {
    "Prince George, BC": {
      locations: {
        Superstore: {
          "2155 Ferry Ave": "1562",
        },
      },
    },
  },
  {
    "Quebec, QC": {
      locations: {
        Maxi: {
          "350, rue Bouvier": "8649",
          "552, boul. Wilfrid-Hamel": "8676",
          "955, boul. René-Lévesque O": "7552",
          "5150, boul. de l'Ormiere": "8049",
          "9550, de l'Ormiere": "4544",
        },
      },
    },
  },
  {
    "Red Deer, AB": {
      locations: {
        Superstore: {
          "A-5016 51 Ave": "1579",
        },
      },
    },
  },
  {
    "Regina, SK": {
      locations: {
        Superstore: {
          "15D 3806 Albert St": "1533",
          "2055 Prince Of Wales Dr": "1584",
          "4450 Rochdale Blvd": "1585",
        },
        "No Frills": {
          "5000 - 4th Ave": "3978",
        },
      },
    },
  },
  {
    "Richmond, ON": {
      locations: {
        Superstore: {
          "4651 No 3 Rd": "1557",
        },
      },
    },
  },
  {
    "Richmond Hill, ON": {
      locations: {
        "No Frills": {
          "9325 Yonge St": "0770",
          "10909 Yonge St": "3771",
        },
        Loblaws: {
          "301 High Tech Rd": "1028",
        },
      },
    },
  },
  {
    "Sarnia, ON": {
      locations: {
        Superstore: {
          "600 Murphy Rd": "2826",
        },
      },
    },
  },
  {
    "Saskatoon, SK": {
      locations: {
        Superstore: {
          "411 Confederation Dr": "1536",
          "2901-8th St E": "1535",
        },
        "No Frills": {
          "1-7 Assiniboine Dr.": "3732",
          "2410-22nd St W": "7579",
          "1018 Taylor St E": "3437",
        },
      },
    },
  },
  {
    "Scarborough, ON": {
      locations: {
        "No Frills": {
          "1880 Eglinton Ave E": "3636",
          "2430 Eglinton Ave E": "7138",
          "2742 Eglinton Ave E": "3468",
          "70 Island Rd": "3698",
          "2471 Kingston Rd": "1346",
          "4473 Kingston Rd": "7544",
          "3401 Lawrence Ave E": "3924",
          "3850 Sheppard Ave E": "1399",
          "681 Silver Star Blvd": "3675",
        },
      },
    },
  },
  {
    "Sherwood Park, AB": {
      locations: {
        Superstore: {
          "410 Baseline Rd": "1567",
        },
      },
    },
  },
  {
    "Spruce Grove, AB": {
      locations: {
        Superstore: {
          "110 Jennifer Heil Way": "1565",
        },
      },
    },
  },
  {
    "St. Albert, AB": {
      locations: {
        Superstore: {
          "101 St Albert Trail": "1568",
        },
      },
    },
  },
  {
    "St-Bruno, QC": {
      locations: {
        Provigo: {
          "1150, rue King-Georges": "7293",
        },
      },
    },
  },
  {
    "St. Catharines, ON": {
      locations: {
        Superstore: {
          "411 Louth St": "0577",
        },
        "No Frills": {
          "525 Welland Ave": "7496",
          "581 Lake St": "0743",
        },
        Zehrs: {
          "285 Geneva St": "0536",
          "221 Glendale Ave": "0522",
        },
      },
    },
  },
  {
    "Stoney Creek, ON": {
      locations: {
        Fortinos: {
          "102 Hwy 8": "7346",
          "21 Upper Centennial Pky S": "0046",
        },
      },
    },
  },
  {
    "Stratford, ON": {
      locations: {
        "No Frills": {
          "25 Hopeton Rd": "3801",
          "618 Huron St": "3478",
        },
        Zehrs: {
          "865 Ontario St": "0557",
        },
      },
    },
  },
  {
    "Sudbury, ON": {
      locations: {
        Superstore: {
          "1485 Lasalle Blvd": "2803",
        },
      },
    },
  },
  {
    "Surrey, BC": {
      locations: {
        Superstore: {
          "14650 104th Ave": "1556",
          "7550 King George Hwy": "1521",
          "2332 160th St": "1551",
        },
        "No Frills": {
          "17710 56 Ave": "3439",
          "12852 96 Ave, 108": "3419",
          "15355 Fraser Hwy": "3240",
        },
      },
    },
  },
  {
    "Sydney, NS": {
      locations: {
        "No Frills": {
          "332 Welton St": "7177",
        },
      },
    },
  },
  {
    "Thunder Bay, ON": {
      locations: {
        Superstore: {
          "971 Carrick St": "1504",
        },
        "No Frills": {
          "1020 Dawson Rd": "3450",
          "1 - 425 Edward St N": "3969",
        },
      },
    },
  },
  {
    "Toronto, ON": {
      locations: {
        Superstore: {
          "1755 Brimley Rd ": "2809",
          "825 Don Mills Rd ": "1077",
          "51 Gerry Fitzgerald Dr ": "1033",
          "2549 Weston Rd ": "2800",
        },
        "No Frills": {
          "1811 Avenue Rd": "7936",
          "243 Alberta Ave": "3640",
          "345 Bloor St E": "7911",
          "2187 Bloor St W": "1376",
          "720 Broadview Ave": "7937",
          "269 Coxwell Avenue": "3931",
          "900 Dufferin St": "7411",
          "1951 Eglinton Ave W": "7087",
          "200 Front St E": "3643",
          "42 Hanna Ave": "7964",
          "1020 Islington Ave": "0753",
          "1022 King St W": "7941",
          "1435 King St W": "3680",
          "222 Lansdowne Ave": "3695",
          "360 McLevin Ave": "3132",
          "372 Pacific Ave": "7921",
          "25 Photography Dr": "3663",
          "449 Parliament St": "7047",
          "1591 Wilson Ave": "0705",
          "1591 Wilson Ave": "7509",
        },
        Metro: {
          "656 Eglinton Ave. E": "1234",
          "425 Bloor St. W": "2",
          "735 College St.": "3",
          "444 Yonge St.": "4",
          "3003 Danforth Ave.": "5",
          "80 Front St. East": "6",
          "89 Gould St.": "7",
          "100 Lynn Williams St.": "8",
          "2155 St. Clair Ave. W": "9",
          "201-1230 Queen Street West": "10",
          "2300 Yonge St.": "11",
          "3142 Yonge St.": "12",
        },
        Loblaws: {
          "15A Bathurst Street": "1424",
          "2877 Bayview Village": "1019",
          "60 Carlton St": "1007",
          "2280 Dundas St W": "1154",
          "3671 Dundas St W": "1099",
          "650 Dupont St": "1029",
          "1-101 Eglinton Ave E": "1020",
          "17 Leslie St": "1004",
          "10 Lower Jarvis St": "1079",
          "301 Moore Ave": "1155",
          "50 Musgrave St": "1021",
          "585 Queen St W": "1000",
          "11 Redway Rd": "1092",
          "12 St Clair Ave E": "1142",
          "396 St Clair Ave W": "1212",
        },
      },
    },
  },
  {
    "Vancouver, BC": {
      locations: {
        Superstore: {
          "350 SE Marine Dr": "1517",
          "3185 Grandview Hwy": "1520",
        },
        "No Frills": {
          "1688 4th Ave W": "3807",
          "130-2083 Alma St": "3671",
          "101 - 1030 Denman St": "3641",
          "1460 Hastings St E": "3354",
          "4508 Fraser St": "3410",
          "310 W Broadway": "3403",
        },
        Loblaws: {
          "3185 Arbutus St": "7491",
          "658 Homer St": "7155",
        },
      },
    },
  },
  {
    "Vaughan, ON": {
      locations: {
        "No Frills": {
          "1054 Centre St.": "3660",
          "1631 Rutherford Rd": "3131",
          "3800 Rutherford Rd Bldg C": "7444",
        },
        Fortinos: {
          "2911 Major MacKenzie Dr": "5547",
          "3940 Hwy 7 RR 2": "0096",
        },
      },
    },
  },
  {
    "Victoria, BC": {
      locations: {
        Superstore: {
          "835 Langford Pkwy": "1527",
        },
      },
    },
  },
  {
    "Waterdown, ON": {
      locations: {
        "No Frills": {
          "36 Clappison Ave": "3114",
        },
      },
    },
  },
  {
    "Waterloo, ON": {
      locations: {
        "No Frills": {
          "24 Forwell Creek": "7181",
        },
        Zehrs: {
          "555 Davenport Rd": "0528",
          "450 Erb St W": "0524",
          "315 Lincoln Rd": "0525",
        },
      },
    },
  },
  {
    "Welland, ON": {
      locations: {
        Zehrs: {
          "821 Niagara St": "0550",
        },
      },
    },
  },
  {
    "Westbank, BC": {
      locations: {
        Superstore: {
          "3020 Louie Dr": "1552",
        },
      },
    },
  },
  {
    "West Vancouver, BC": {
      locations: {
        Loblaws: {
          "861-845 Park Royal N": "7494",
        },
      },
    },
  },
  {
    "Whitby, ON": {
      locations: {
        Superstore: {
          "200 Taunton Rd W": "1058",
        },
        "No Frills": {
          "2-3100 Garden St": "7032",
          "3555 Thickson Rd N": "3145",
          "920 Dundas St W": "7166",
        },
      },
    },
  },
  {
    "Whitehorse, YT": {
      locations: {
        Superstore: {
          "2270-2nd Ave": "1530",
        },
      },
    },
  },
  {
    "Windsor, ON": {
      locations: {
        Superstore: {
          "2430 Dougall Ave": "2827",
          "4371 Walker Rd": "0567",
        },
        "No Frills": {
          "3975 Wyandotte St E": "3152",
        },
        Zehrs: {
          "5890 Malden Rd": "0521",
          "7201 Tecumseh Rd E": "0529",
        },
      },
    },
  },
  {
    "Winnipeg, MB": {
      locations: {
        Superstore: {
          "80 Bison Dr ": "1509",
          "1035 Gateway Rd ": "1512",
          "550 Kenaston Blvd ": "1516",
          "2132 Mcphillips St ": "1505",
          "3193 Portage Ave ": "1508",
          "1578 Regent Ave W ": "1506",
          "215 St Anne's Rd ": "1514",
          "1385 Sargent Ave ": "1511",
        },
        "No Frills": {
          "161 Goulet St": "7151",
          "1795 Henderson Highway": "7507",
          "1445 Main St": "3442",
          "600 Notre Dame Ave": "7141",
          "1500 Plessis Rd.": "7158",
          "6650 Roblin Blvd": "3647",
          "740 St. Anne's Rd": "7074",
          "677 Stafford St.": "5456",
        },
      },
    },
  },
  {
    "Woodbridge, ON": {
      locations: {
        "No Frills": {
          "5731 Hwy 7": "3490",
        },
        Fortinos: {
          "8585 Hwy 27, RR3": "0055",
        },
      },
    },
  },
];

module.exports = storesData;
