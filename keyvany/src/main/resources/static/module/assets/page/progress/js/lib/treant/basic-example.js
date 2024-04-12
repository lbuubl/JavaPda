/*
var config = {
        container: "#basic-example",
        
        connectors: {
            type: 'step'
        },
        node: {
            HTMLclass: 'nodeExample1'
        }
    },
    ceo = {
        text: {
            name: "Mark Hill",
            title: "Chief executive officer",
            contact: "Tel: 01 213 123 134",
        },
        image: "../headshots/2.jpg"
    },

    cto = {
        parent: ceo,
        text:{
            name: "Joe Linux",
            title: "Chief Technology Officer",
        },
        stackChildren: true,
        image: "../headshots/1.jpg"
    },
    cbo = {
        parent: ceo,
        stackChildren: true,
        text:{
            name: "Linda May",
            title: "Chief Business Officer",
        },
        image: "../headshots/5.jpg"
    },
    cdo = {
        parent: ceo,
        text:{
            name: "John Green",
            title: "Chief accounting officer",
            contact: "Tel: 01 213 123 134",
        },
        image: "../headshots/6.jpg"
    },
    cio = {
        parent: cto,
        text:{
            name: "Ron Blomquist",
            title: "Chief Information Security Officer"
        },
        image: "../headshots/8.jpg"
    },
    ciso = {
        parent: cto,
        text:{
            name: "Michael Rubin",
            title: "Chief Innovation Officer",
            contact: {val: "we@aregreat.com", href: "mailto:we@aregreat.com"}
        },
        image: "../headshots/9.jpg"
    },
    cio2 = {
        parent: cdo,
        text:{
            name: "Erica Reel",
            title: "Chief Customer Officer"
        },
        link: {
            href: "http://www.google.com"
        },
        image: "../headshots/10.jpg"
    },
    ciso2 = {
        parent: cbo,
        text:{
            name: "Alice Lopez",
            title: "Chief Communications Officer"
        },
        image: "../headshots/7.jpg"
    },
    ciso3 = {
        parent: cbo,
        text:{
            name: "Mary Johnson",
            title: "Chief Brand Officer"
        },
        image: "../headshots/4.jpg"
    },
    ciso4 = {
        parent: cbo,
        text:{
            name: "Kirk Douglas",
            title: "Chief Business Development Officer"
        },
        image: "../headshots/11.jpg"
    }

    chart_config = [
        config,
        ceo,
        cto,
        cbo,
        cdo,
        cio,
        ciso,
        cio2,
        ciso2,
        ciso3,
        ciso4
    ];

*/


    // Another approach, same result
    // JSON approach


    var chart_config = {
        chart: {
            container: "#basic-example",
            
            connectors: {
                type: 'step'
            },
            node: {
                HTMLclass: 'nodeExample1'
            },
			levelSeparation : 15, //위 아래간격
			siblingSeparation : 10, //좌우간격
			subTeeSeparation :10, //좌우간격
			padding : 15
        },
        nodeStructure: {
			innerHTML: '<table border=1 width="100%"><tr><td rowspan=4 width=60><img src="../headshots/2.jpg"></td></tr><tr><td colspan=2>현장소장</td></tr><tr><td>부장</td><td>하원기</td></tr><tr><td>부임일</td><td>18.12.23</td></tr></table>',
			HTMLclass : "OBS_M",
            children: [
                {
					innerHTML: '<table width="100%" height="25"><tr><td align=center>안전/보건</td></tr></table>',
					HTMLclass : "OBS_G",
                    stackChildren: true,
                    children: [
                        {
							innerHTML: '<table border=1 width="100%"><tr><td rowspan=4 width=60><img src="../headshots/10.jpg"></td></tr><tr><td colspan=2>안전책임자</td></tr><tr><td>사원</td><td>손영주</td></tr><tr><td>부임일</td><td>18.12.23</td></tr></table>',
							HTMLclass : "OBS_M"
                        },
                        {
                         	innerHTML: '<table border=1 width="100%"><tr><td rowspan=4 width=60><img src="../headshots/10.jpg"></td></tr><tr><td colspan=2>보건관리자</td></tr><tr><td>과장</td><td>신인섭</td></tr><tr><td>부임일</td><td>18.12.23</td></tr></table>',
							HTMLclass : "OBS_M"
                        }
                    ]
                },
                {
                   
                    innerHTML: '<table width="100%" height="25"><tr><td align=center>품질</td></tr></table>',
					HTMLclass : "OBS_G",
                    children: [
                        {
                         	innerHTML: '<table border=1 width="100%"><tr><td rowspan=4 width=60><img src="../headshots/10.jpg"></td></tr><tr><td colspan=2>품질</td></tr><tr><td>과장</td><td>선정욱</td></tr><tr><td>부임일</td><td>18.12.23</td></tr></table>',
							HTMLclass : "OBS_M"
                        }
                    ]
                },
                {
					 innerHTML: '<table width="100%" height="25"><tr><td align=center>안전</td></tr></table>',
					HTMLclass : "OBS_G",
					stackChildren: true,
                    children: [
                        {
							innerHTML: '<table border=1 width="100%"><tr><td rowspan=4 width=60><img src="../headshots/10.jpg"></td></tr><tr><td colspan=2>안전</td></tr><tr><td>대리</td><td>박현수</td></tr><tr><td>부임일</td><td>18.12.23</td></tr></table>',
							HTMLclass : "OBS_M"
                        },{
							innerHTML: '<table border=1 width="100%"><tr><td rowspan=4 width=60><img src="../headshots/10.jpg"></td></tr><tr><td colspan=2>안전</td></tr><tr><td>사원</td><td>민경민</td></tr><tr><td>부임일</td><td>18.12.23</td></tr></table>',
							HTMLclass : "OBS_M"
                        }
                    ]
                },
                {
                    //stackChildren: true,
                    innerHTML: '<table width="100%" height="25"><tr><td align=center>공무</td></tr></table>',
					HTMLclass : "OBS_G",
					stackChildren: true,
                    children: [
                        {
							innerHTML: '<table border=1 width="100%"><tr><td rowspan=4 width=60><img src="../headshots/10.jpg"></td></tr><tr><td colspan=2>공무책임자</td></tr><tr><td>사원</td><td>김은혜</td></tr><tr><td>부임일</td><td>18.12.23</td></tr></table>',
							HTMLclass : "OBS_M"
                        },
						 {
							innerHTML: '<table border=1 width="100%"><tr><td rowspan=4 width=60><img src="../headshots/10.jpg"></td></tr><tr><td colspan=2>공무/출납</td></tr><tr><td>대리</td><td>김은찬</td></tr><tr><td>부임일</td><td>18.12.23</td></tr></table>',
							HTMLclass : "OBS_M"
                        },
						 {
							innerHTML: '<table border=1 width="100%"><tr><td rowspan=4 width=60><img src="../headshots/10.jpg"></td></tr><tr><td colspan=2>총무</td></tr><tr><td>사원</td><td>허영완</td></tr><tr><td>부임일</td><td>18.12.23</td></tr></table>',
							HTMLclass : "OBS_M"
                        }
                    ]
                },
                {
                    //stackChildren: true,
                    innerHTML: '<table width="100%" height="25"><tr><td align=center>건축</td></tr></table>',
					HTMLclass : "OBS_G",
					stackChildren: true,
                    children: [
                        {
							innerHTML: '<table border=1 width="100%"><tr><td rowspan=4 width=60><img src="../headshots/10.jpg"></td></tr><tr><td colspan=2>건축공구장</td></tr><tr><td>과장</td><td>박치호</td></tr><tr><td>부임일</td><td>18.12.23</td></tr></table>',
							HTMLclass : "OBS_M"
                        },  {
							innerHTML: '<table border=1 width="100%"><tr><td rowspan=4 width=60><img src="../headshots/10.jpg"></td></tr><tr><td colspan=2>건축</td></tr><tr><td>부장</td><td>백승훈</td></tr><tr><td>부임일</td><td>18.12.23</td></tr></table>',
							HTMLclass : "OBS_M"
                        },  {
							innerHTML: '<table border=1 width="100%"><tr><td rowspan=4 width=60><img src="../headshots/10.jpg"></td></tr><tr><td colspan=2>건축</td></tr><tr><td>차장</td><td>윤영순</td></tr><tr><td>부임일</td><td>18.12.23</td></tr></table>',
							HTMLclass : "OBS_M"
                        }
                    ]
                },
                {
                    //stackChildren: true,
                    innerHTML: '<table width="100%" height="25"><tr><td align=center>설비</td></tr></table>',
					HTMLclass : "OBS_G",
                    children: [
                        {
							innerHTML: '<table border=1 width="100%"><tr><td rowspan=4 width=60><img src="../headshots/10.jpg"></td></tr><tr><td colspan=2>전기공구장</td></tr><tr><td>차장</td><td>한충희</td></tr><tr><td>부임일</td><td>18.12.23</td></tr></table>',
							HTMLclass : "OBS_M"
                        }
                    ]
                }
            ]
        }
    };

