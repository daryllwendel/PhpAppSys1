function toggleMenu() {
    const menu = document.querySelector(".menu");
    menu.classList.toggle("active");
    const nav = document.querySelector(".nav");
    nav.classList.toggle("expanded");
}

function profileset(){
        const profile = document.getElementById("customerProfile");
        const password = document.getElementById("customerPassword");
        const location = document.getElementById("customerLocation")
    
        const profcus = document.querySelector(".profcus");
        const profileInfo = document.querySelector(".profileInfo");
        const changepass = document.querySelector(".changepass");
        const locationSection = document.querySelector(".location");
        const profaddress = document.querySelector(".profaddress")
    
        function hideAllSections() {
            profcus.style.display = "none";
            changepass.style.display = "none";
            locationSection.style.display = "none";
            profileInfo.style.display="none"
            profaddress.style.display = "none"
        }
    
        profile.addEventListener("click", function () {
            hideAllSections();
            profcus.style.display = "grid";
            profileInfo.style.display = "grid";
            profaddress.style.display = "grid"
    
        });
    
        password.addEventListener("click", function () {
            hideAllSections();
            changepass.style.display = "grid";
        });
    
        location.addEventListener("click", function () {
            hideAllSections();
            locationSection.style.display = "grid";
        });
    
        hideAllSections();
        profcus.style.display = "grid";
        profaddress.style.display = "grid"
        profileInfo.style.display = "grid"
}


function sortTable(column) {
    const table = document.querySelector('.table');
    const header = table.querySelector('.header');
    const rows = Array.from(table.querySelectorAll('.row:"not(.header)'));

    const sortedRows = rows.sort((a, b) => {
        const aCell = a.querySelector(`.cell[data-column="${column}"]`);
        const bCell = b.querySelector(`.cell[data-column="${column}"]`);

        if (!aCell || !bCell) {
            console.error('Cell not found for column:"', column);
            return 0;
        }

        const aText = aCell.textContent.trim();
        const bText = bCell.textContent.trim();
        const aIsNumeric = !isNaN(Number(aText));
        const bIsNumeric = !isNaN(Number(bText));
        if (column === 'Order No.') {
            return Number(aText) - Number(bText); 
        }else if(column === 'Quantity'){
            return Number(aText) - Number(bText);
        } else {
            return aText.localeCompare(bText); 
        }
    });

    sortedRows.forEach(row => {
        table.insertBefore(row, header.nextSibling);
        table.style.overflow = 'auto';
        header.style.position = 'sticky';
        header.style.zIndex = '1';
        header.style.top = '0';
        header.style.background = 'white';
        header.style.borderBottom = '1px solid black'
    });

}
function sortTable1(column) {
    const table1 = document.querySelector('.table1');
    const header1 = table1.querySelector('.header1');
    const rows1 = Array.from(table1.querySelectorAll('.row1:"not(.header1)'));

    const sortedRows = rows1.sort((a, b) => {
        const aCell = a.querySelector(`.cell1[data-column="${column}"]`);
        const bCell = b.querySelector(`.cell1[data-column="${column}"]`);

        if (!aCell || !bCell) {
            console.error('Cell not found for column:"', column);
            return 0; 
        }

        const aText = aCell.textContent.trim();
        const bText = bCell.textContent.trim();

        if (column === 'Order No.' || column === 'Quantity') {
            return Number(aText) - Number(bText);
        } else {
            return aText.localeCompare(bText);
        }
    });

    sortedRows.forEach(row => {
        table1.insertBefore(row, header1.nextSibling);
        table1.style.overflow = 'auto';
        header1.style.position = 'sticky';
        header1.style.zIndex = '1';
        header1.style.top = '0';
        header1.style.background = 'white';
        header1.style.borderBottom = '1px solid black'
      
    });

}
function swipe(){
    new Swiper('.card-wrapper', {
        loop: true,
        spaceBetween: 30,
    
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
    
        navigation:{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints:{
            0:{
                slidesPerView: 1
            },
            768:{
                slidesPerView: 2
            },
            1024:{
                slidesPerView: 3
            }
        }
    
    });
}
function initCartListeners() {
    document.addEventListener("click", function (e) {
      const cart = document.getElementById("addtocart");
      const overlay = document.getElementById("overlay");
  
      if (e.target.id === "cartbutton") {
        if (cart && overlay) {
          cart.style.display = "grid";
        }
      }

      if(e.target.closest(".confirm")){
        if(cart && overlay){
            cart.style.display = "none"
            overlay.style.display = "grid"
        }
      }
  
      if (e.target.id== "reject") {
        if (cart && overlay) {
          cart.style.display = "none";
          overlay.style.display = "none";
        }
      }
  
      if (e.target.closest(".accept")) {
        if (cart && overlay) {
          cart.style.display = "none";
          overlay.style.display = "none";
        }
      }

      if(e.target.closest(".view button")){
        if(cart && overlay){
            overlay.style.display="none"
        }
      }
    });
  }
  
  function loadcustomerdashboard() {
    fetch('/CustomerHome')
      .then(res => res.text())
      .then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
  
        const dashboardContent = doc.querySelector(".customerdashboard");
        const cart = doc.querySelector("#addtocart");
        const overlay = doc.querySelector("#overlay");
  
        if (dashboardContent) {
          console.log('Loading customer dashboard...');
          document.getElementById("title").innerHTML = `<div>Home</div>`;
          
          const content = document.getElementById("change-container");
          content.innerHTML = "";
          content.appendChild(dashboardContent);
  
          if (cart && overlay) {
            cart.style.display = "none";
            overlay.style.display = "none";
            
            if (!document.getElementById("addtocart")) {
              document.body.appendChild(cart);
            }
            if (!document.getElementById("overlay")) {
              document.body.appendChild(overlay);
            }
          }
  
          swipe(); 
          initCartListeners();
        } else {
          console.log('Failed to find dashboard content in response.');
        }
      })
      .catch((err) => console.error("Failed to load dashboard content:", err));
  }
  

function loaddesigns(){
    fetch('/CustomerNewDesigns')
    .then(res => res.text())
    .then((html)=>{
        const parser = new DOMParser()
        const doc = parser.parseFromString(html,"text/html")

        const designdisplay = doc.querySelector(".main-container")
        if(designdisplay){
            console.log('haxaha')
            document.getElementById("title").innerHTML=`
            <div>Designs</div>`
            const content = document.getElementById("change-container");
            content.innerHTML = "";
            content.appendChild(designdisplay)

            document.getElementById("new").addEventListener('click', function(){
                fetch('/CustomerNewOrder-display')
                .then(res => res.text())
                .then((html)=>{
                    const parser1 = new DOMParser()
                    const doc1 = parser1.parseFromString(html,"text/html")

                    const designdisplay1 = doc1.querySelector(".customerNewOrder-container")
                        if(designdisplay1){
                            console.log('haxasdadaha')
                            document.getElementById("subTitle1").innerHTML=`
                            <div>New Designs</div>
                            <img src="{{ asset('images/sampleimg.png')}}" alt="">`
                            const content1 = document.getElementById("subTitle2");
                            content1.innerHTML = "";
                            content1.appendChild(designdisplay1)
                    }else{
                        console.log('okay')
                    }
                })
            })


            document.getElementById("my").addEventListener('click', function(){
                fetch('/CustomerMyDesignOrder-display')
                .then(res => res.text())
                .then((html)=>{
                    const parser2 = new DOMParser()
                    const doc2 = parser2.parseFromString(html,"text/html")

                    const designdisplay2 = doc2.querySelector(".customermyorder-container")
                        if(designdisplay2){
                            console.log('haxasdadaha')
                            document.getElementById("subTitle1").innerHTML=`
                            <div>My Designs</div>
                            <img src="{{ asset('images/sampleimg.png')}}" alt="">`
                            const content2 = document.getElementById("subTitle2");
                            content2.innerHTML = "";
                            content2.appendChild(designdisplay2)
                    }else{
                        console.log('okay')
                    }
                })
            })


        }else{
            console.log('okayss')
        }
    })
}
function loadprofile(){
    fetch('/CustomerProfile')
    .then(res => res.text())
    .then((html)=>{
        const parser = new DOMParser()
        const doc = parser.parseFromString(html,"text/html")

        const profledisplay = doc.querySelector(".profilecontainer")
        if(profledisplay    ){
            console.log('haxaha')
            document.getElementById("title").innerHTML=`
            <div>Profile</div>`
            const content = document.getElementById("change-container");
            content.innerHTML = "";
            content.appendChild(profledisplay)
            profileset()
            profilepic()
            address();
        }else{
            console.log('okay')
        }
    })
}

function loadorders(){
    fetch('/CustomerOrder-display')
    .then(res => res.text())
    .then((html)=>{
        const parser = new DOMParser()
        const doc = parser.parseFromString(html,"text/html")

        const orderdisplay = doc.querySelector(".orderscont")
        if(orderdisplay){
            console.log('haxaha')
            document.getElementById("title").innerHTML=`
            <div>Orders</div>`
            const content = document.getElementById("change-container");
            content.innerHTML = "";
            content.appendChild(orderdisplay)
            document.getElementById('sortButton').addEventListener('click', () => {
                const selectedOption = document.getElementById('sortOptions').value;
                sortTable(selectedOption);
            });
            document.getElementById('sortButton1').addEventListener('click', () => {
                const selectedOption = document.getElementById('sortOptions1').value;
                sortTable1(selectedOption);
            });
        }else{
            console.log('okay')
        }
    })
}

function adddesign(){
    fetch('/CustomerAddADesign-display')
    .then(res => res.text())
    .then((html)=>{
        const parser = new DOMParser()
        const doc = parser.parseFromString(html,"text/html")

        const addadesign = doc.querySelector(".completed-container")
        if(addadesign){
            console.log('haxaha')
            document.getElementById("title").innerHTML=`
            <div>Add A Design </div>`
            const content = document.getElementById("change-container");
            content.innerHTML = "";
            content.appendChild(addadesign)
        }else{
            console.log('okay')
        }
    })
}

function profilepic(){
    const inputFile = document.getElementById("input-file");
    const profilePic = document.getElementById("profile-pic");

    inputFile.addEventListener("change", function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profilePic.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
}
        






document.addEventListener("DOMContentLoaded", ()=>{
    loadcustomerdashboard();
    document.getElementById("home").addEventListener("click",loadcustomerdashboard)
})

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("design").addEventListener("click", loaddesigns)
})

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("profile").addEventListener("click", loadprofile)
})
document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("order").addEventListener("click", loadorders)
})
document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("add").addEventListener("click", adddesign)
})















function address() {
    const provinceSelect = document.getElementById("provinceSelect");
    const citySelect = document.getElementById("citySelect");
    const barangaySelect = document.getElementById("baranggaySelect");
    const zipcodeInput = document.getElementById("zipcode");
    const purokInput = document.getElementById("purokInput");

    const locationData = {
        "Abra": {
            cities: {"Bangued":["Agtangao","Angad","Bangbangar","Bañacao","Cabuloan","Calaba","Cosili East",
                     "Cosili West","Dangdangla","Lingtan","Lipcan","Lubong","Macarcarmay","Macray","Malita",
                     "Maoay","Palao","Patucannay","Sagap","San Antonio","Santa Rosa","Sao-atan","Sappaac",
                     "Tablac","Zone 1 Poblacion","Zone 2 Poblacion","Zone 3 Poblacion","Zone 4 Poblacion",
                     "Zone 5 Poblacion","Zone 6 Poblacion","Zone 7 Poblacion"], 
                     
                     "Boliney": ["","Amti","Bao-yan","Danac East","Danac West","Dao-angan","Damugas",
                     "Kilong-Olao","Poblacion"], 
                     
                     "Bucay":["Abang", "Bangbangcag", "Bangcagan", "Banglolao", "Bugbog", "Calao", 
                     "Dugong", "Labon", "Layugan", "Madalipay", "North Poblacion", "Pagala", "Pakiling",
                     "Palaquio", "Patoc", "Quimloong", "Salnec", "San Miguel", "Siblong", "South Poblacion",
                     "Tabiog"], 
                     
                     "Bucloc":["Dicligan","Labaan","Lamao","Lingay"], 
                     
                     "Daguioman":["Ableg","Cabaruyan","Pikek","Tui"], 
                     
                     "Danglas":["Abaquid","Cabaruan","Caupasan","Danglas","Nagaparan","Padangitan","Pangal"], 
                     
                     "Dolores":["Bayaan", "Cabaroan", "Calumbaya", "Cardona", "Isit", "Kimmalaba", "Libtec",
                     "Lub-lubba", "Mudiit", "Namit-ingan", "Pacac", "Poblacion", "Salucag", "Talogtog", 
                     "Taping"], 
                     
                     "La Paz":["Benben", "Bulbulala", "Buli", "Canan", "Liguis", "Malabbaga", 
                     "Mudeng", "Pidipid", "Poblacion", "San Gregorio", "Toon", "Udangan"], 
                     
                     "Lacub":["Bacag","Buneg","Guinguinabang", "Lan-ag","Pococ","Poblacion"], 

                     "Lagangilang":["Aguet", "Bacooc", "Balais", "Cayapa", "Dalaguisen", "Laang",
                     "Lagben", "Laguiben", "Nagtipulan", "Nagtupacan", "Paganao", "Pawa", "Poblacion", 
                     "Presentar", "San Isidro", "Tagodtod", "Taping"], 

                     "Lagayan":["Ba-i","Collago","Pang-ot","Poblacion","Pulot"], 

                     "Langiden":["Baac","Dalayap","Mabungot","Malapaao","Poblacion","Quillat",], 

                     "Licuan-Baay":["Bonglo", "Bulbulala", "Cawayan", "Domenglay", "Lenneng", 
                     "Mapisla", "Mogao", "Nalbuan", "Poblacion", "Subagan", "Tumalip"], 

                     "Luba":["Ampalioc", "Barit", "Gayaman", "Lul-luno", "Luzong", "Nagbukel-Tuquipa", 
                     "Poblacion", "Sabnangan"],

                     "Malibcong":["Bayabas", "Binasaran", "Buanao", "Dulao", "Duldulao", "Gacab", "Lat-ey", 
                     "Malibcong", "Mataragan", "Pacgued", "Taripan", "Umnap"], 

                     "Manabo":["Ayyeng", "Catacdegan Nuevo", "Catacdegan Viejo", "Luzong", "San Jose Norte",
                     "San Jose Sur", "San Juan Norte", "San Juan Sur", "San Ramon East", "San Ramon West",
                     "Santo Tomas"], 

                     "Peñarrubia":["Dumayco", "Lusuac", "Malamsit", "Namarabar", "Patiao", "Poblacion", 
                     "Riang", "Santa Rosa", "Tattawa"], 

                     "Pidigan":["Alinaya", "Arab", "Garreta", "Immuli", "Laskig", "Monggoc", "Naguirayan", 
                     "Pamutic", "Pangtud", "Poblacion East", "Poblacion West", "San Diego", "Sulbec", 
                     "Suyo", "Yuyeng"], 

                     "Pilar":["Bolbolo", "Brookside", "Dalit", "Dintan", "Gapang", "Kinabiti", "Maliplipit",
                     "Nagcanasan", "Nanangduan", "Narnara", "Ocup", "Pang-ot", "Patad", "Poblacion", 
                     "San Juan East", "San Juan West", "South Balioag", "Tikitik", "Villavieja"], 

                     "Sallapadan":["Bazar", "Bilabila", "Gangal", "Maguyepyep", "Naguilian", "Saccaang", 
                     "Sallapadan", "Subusob", "Ud-udiao"], 

                     "San Isidro":["Dalimag", "Langbaban", "Manayday", "Pantoc", "Poblacion", "Sabtan-olo",
                     "San Marcial", "Tangbao"], 
                     
                     "San Juan":["Abualan", "Ba-ug", "Badas", "Cabcaborao", "Colabaoan", "Culiong", "Daoidao", 
                     "Guimba", "Lam-ag", "Lumobang", "Nangobongan", "Pattaoig", "Poblacion North", 
                     "Poblacion South", "Quidaoen", "Sabangan"], 

                     "San Quintin":["Silet", "Supi-il", "Tagaytay", "Labaan", "Palang", "Pantoc", 
                     "Poblacion", "Tangadan", "Villa Mercedes"], 

                     "Tayum":["Bagalay", "Basbasa", "Budac", "Bumagcat", "Cabaroan", "Deet", "Gaddani", 
                     "Patucannay", "Pias", "Poblacion","Velasco"], 

                     "Tineg":["Velasco", "Alaoa", "Anayan", "Apao", "Belaat", "Caganayan", "Cogon", "Lanec", "Lapat-Balantay", "Naglibacan", "Poblacion"], 

                     "Tubo":["Alaoa", "Anayan", "Apao", "Belaat", "Caganayan", "Cogon", "Lanec", "Lapat-Balantay", "Naglibacan", "Poblacion", "Alangtin", "Amtuagan", "Dilong", "Kili", "Poblacion", "Supo", "Tabacda", "Tiempo", "Tubtuba"], 

                     "Villaviciosa":["Wayangan", "Ap-apaya", "Bol-lilising", "Cal-lao", "Lap-lapog", "Lumaba", "Poblacion", "Tamac", "Tuquib"]
            },
            barangays: [  ]
        },
        "Agusan del Norte": {
            cities: {"Buenavista":["Abilan", "Agong ong", "Alubijid", "Guinabsan", "Lower Olave", "Macalang", "Malapong", "Malpoc", "Manapa", "Matabao", 
"Poblacion 1", "Poblacion 2", "Poblacion 3", "Poblacion 4", "Poblacion 5", "Poblacion 6", "Poblacion 7", 
"Poblacion 8", "Poblacion 9", "Poblacion 10", "Rizal", "Sacol", "Sangay", "Simbalan", "Talo ao"], 
                    "Butuan":[], 
                    "Cabadbaran":["Antonio Luna", "Bay ang", "Bayabas", "Caasinan", "Cabinet", "Calamba", "Calibunan", "Comagascas", "Concepcion", 
"Del Pilar", "Katugasan", "Kauswagan", "La Union", "Mabini", "Mahaba", 
"Poblacion 1", "Poblacion 2", "Poblacion 3", "Poblacion 4", "Poblacion 5", 
"Poblacion 6", "Poblacion 7", "Poblacion 8", "Poblacion 9", "Poblacion 10", 
"Poblacion 11", "Poblacion 12", "Puting Bato", "Sanghan", "Soriano", "Tolosa"
], 
                    "Carmen":["Cahayagan", "Gosoon", "Manoligao", "Poblacion", "Rojales", "San Agustin", "Tagcatong", "Vinapor"
], 
                    "Jabonga":["A. Beltran", "Baleguian", "Bangonay", "Bunga", "Colorado", "Cuyago", "Libas", "Magdagooc", 
"Magsaysay", "Maraiging", "Poblacion", "San Jose", "San Pablo", "San Vicente", "Santo Niño"
], 
                    "Kitcharao":["Bangayan", "Canaway", "Crossing", "Hinimbangan", "Jaliobong", "Mahayahay", "Poblacion", 
"San Isidro", "San Roque", "Sangay", "Songkay"
], 
                     "Las Nieves":["Ambacon", "Balungagan", "Bonifacio", "Casiklan", "Consorcia", "Durlan", "Eduardo G. Montilla", 
"Ibuan", "Katipunan", "Lingayao", "Malicato", "Maningalao", "Marcos Calo", "Mat-i", "Pinana-an", 
"Poblacion", "Rosario", "San Isidro", "San Roque", "Tinucoran"
],
                     "Magallanes":["Buhang", "Caloc-an","Guiasan", "Marcos", "Poblacion", "Santo Niño", "Santo Rosario", "Taod-oy"
], 
                     "Nasipit":["Aclan", "Amontay", "Ata-atahon", "Barangay 1", "Barangay 2", "Barangay 3", 
"Barangay 4", "Barangay 5", "Barangay 6", "Barangay 7", "Camagong", 
"Cubi-cubi", "Culit", "Jaguimitan", "Kinabjangan", "Punta", "Santa Ana", 
"Talisay", "Triangulo"
], 
                     "Remedios T. Romualdez":["Balangbalang", "Basilisa", "Humilog", "Panaytayon", "Poblacion", 
"Poblacion II", "San Antonio", "Tagbongabong"
], 
                     "Santiago":["Curva", "Estanislao Morgado", "Jagupit", "La Paz", "Pangaylan IP", 
"Poblacion I", "Poblacion III", "San Isidro", "Tagbuyacan"
], 
                     "Tubay":["Binuangan", "Cabayawa", "Dona Rosario", "Doña Telestora", "La Fraternidad", 
"Lawigan", "Poblacion 1", "Poblacion 2", "Santa Ana", "Tagmamarkay", 
"Tagpangahoy", "Tinigbasan", "Victory"
]},
            barangays: [  ]
        },
        "Agusan del Sur": {
            cities: {"Bayugan":["Berseba", "Bucac", "Cagbas", "Calaitan", "Canayugan", "Charito", 
"Claro Cortez", "Fili", "Gamao", "Getsomane", "Grace Estate", 
"Hamogaway", "Katipunan", "Mabuhay", "Magkiangkang", "Mahayag", 
"Marcelina", "Maygatasan", "Montivesta", "Mt. Ararat", "Mt. Carmel", 
"Mt. Oliva", "New Salem", "Noli", "Osmeña", "Panaytay", "Pinagalaan", 
"Poblacion", "Sagmone", "Saguma", "Salvacion", "San Agustin", 
"San Isidro", "San Juan", "Santa Irene", "Santa Teresita", "Santo Niño", 
"Taglatawan", "Taglibas", "Tagubay", "Verdu", "Villa Undayon", "Wawa"
], 
                "Bunawan":["Bunawan Brook", "Consuelo", "Imelda", "Libertad", "Mambalili", 
"Nueva Era", "Poblacion", "San Andres", "San Marcos", "San Teodoro"
], 
                "Esperanza":["Agsabu", "Aguinaldo", "Anolingan", "Bakingking", "Balubo","Agsabu", "Aguinaldo", "Anolingan", "Bakingking", "Balubo", 
"Bentahon", "Bunaguit", "Catmonon", "Cebulan", "Concordia", 
"Crossing Luna", "Cubo", "Dakutan", "Duangan", "Guadalupe", 
"Guibonon", "Hawilian", "Kalabuan", "Kinamaybay", "Labao", 
"Langag", "Maasin", "Mac Arthur", "Mahagcot", "Maliwanag", 
"Milagros", "Nato", "New Gingoog", "Odiong", "Oro", "Piglawigan", 
"Poblacion", "Remedios", "Salug", "San Iidro", "San Jose", 
"San Toribio", "San Vicente", "Santa Fe", "Segunda", "Sinakungan", 
"Tagabase", "Taganahaw", "Tagbalili", "Tahina", "Tandang Sora", 
"Valentina"
], 
                "La Paz":["Angeles", "Bataan", "Comota", "Halapitan", "Kasapa II","Langasian", "Lydia", "Osmeñla Sr", "Panagangan", "Poblacion",
"Sabang Adgawan", "Sagunto", "San Patricio", "Valentina", "Villa Paz"
], 
                "Loreto":["Binucayan", "Johnson", "Kasapa", "Katipunan", "Kauswagan", "Magaud",
"Nueva Gracia", "Poblacion", "Sabud", "San Isidro", "San Marlano", 
"San Vicente", "Santa Teresa", "Santo Nifo", "Santo Tomas", "Violanta", "Waloe"
], 
                "Prosperidad":["Aurora", "Awa", "Azpetia", "La Caridad", "La Perian", "La Purisima", 
"La Suerte", "La Union", "Las Navas", "Libertad", "Los Arcos", "Lucena", 
"Mabuhay", "Magsaysay", "Mapaga", "Napo", "New Maug", "Patin ay", 
"Poblacion", "Salimbogaon", "Salvacion", "San Joaquin", "San Jose", 
"San Lorenzo", "San Martin", "San Pedro", "San Ratael", "San Roque", 
"San Salvador", "San Vicente", "Santa Irene", "Santa Maria"
], 
                "Rosario":["Bayugan 3", "Cabantao","Cabawan", "Libuac", "Maligaya", "Marfil", "Novele", 
"Poblacion", "Santa Cruz", "Tagbayagan", "Wasi an"
], 
                "San Francisco":["Alegria", "Barangay 1", "Barangay 2", "Barangay 3", "Barangay 4", 
"Barangay 5", "Bayugan 2", "Bitan agan", "Borbon", "Buenasuerte",
"Caimpugan", "Das agan", "Ebro", "Hubang", "Karaus", "Ladgadan", 
"Lapinigan", "Lucac", "Mate", "New Visayas", "Oraca", "Pasta", 
"Pisa an", "Rizal", "San Isidro", "Santa Ana", "Tagapua"
], 
                "San Luis":["Anislagan", "Balit", "Baylo", "Binicalan", "Cecilia", 
"Coalicion", "Culi", "Dimasalang","Don Alejandro", "Don Pedro", "Dona Flavia", "Doña Maxima", 
"Mahagsay", "Mahapag", "Mahayahay", "Muritula", "Nuevo Trabajo",
"Poblacion", "Policarpo", "San Isidro", "San Pedro", "Santa Ines", 
"Santa Rita", "Santiago", "Wegguam"
], 
                "Santa Josefa":["Angas", "Auroa", "Awao", "Concepcion", "Pag asa", "Patrocinio", 
"Poblacion", "San Jose", "Santa Isabel", "Sayon", "Tapaz"
], 
                "Sibagat":["Atga", "Anahawan", "Banagbanag", "Del Rosario", "El Rio", "lihan",
"Kauswagan", "Kioya", "Kolambugan", "Magkalape", "Magsaysay", 
"Mahayahay", "New Tubigon", "Padliay", "Perez", "Poblacion", 
"San Isidro", "San Vicente", "Santa Cruz", "Santa Maria", "Sinal",
"Tabon tabon", "Tag uyango", "Villangit"
], 
                "Talacogon":["Batucan", "BuenaGracia", "Causwagan", "Culi", "Del Monte",
"Desamparados", "La Flora", "Labnig", "Maharlika","Marbon", "Sabang Gibung", "San Agustin", "San Isidro", "San Nicolas",
"Zamora", "Zillovia"
], 
                "Trento":["Basa", "Cebolin", "Cuevas", "Kapatungan", "Langkila an", "Manat",
"New Visayas", "Pangyan", "Poblacion", "Pulang lupa", "Salvacion",
"San Ignacio", "San Isidro", "San Roque", "Santa Maria", "Tudela"
], 
                "Veruela":["Anitap", "Bacay II", "Binongan", "Caigangan", "Candiis", "Del Monte",
"Don Mateo", "Katipunan", "La Fortuna", "Limot", "Magsaysay", "Masayan",
"Poblacion", "Sampaguita", "San Gabriel", "Santa Cruz", "Santa Emelia",
"Sawagan", "Sinobong", "Sisimon"
]},
            barangays: [  ]
        },
        "Aklan": {
            cities: {"Altavas":["Cabangila", "Cabugao", "Catmon", "Dalipdip", "Ginictan", "Linayasan", "Lumaynay",
"Lupo", "Man up", "Odiong", "Poblacion", "Quinasay an", "Talon", "Tibiao"
], 
                "Balete":["Aranas", "Arcangel", "Calizo", "Cortes", "Feliciano", "Fullgencio", "Guanko",
"Morales", "Oquendo", "Poblacion"
], 
                "Banga":["Agbanawan", "Bacan", "Badiangan", "Cerudo", "Cupang", "Daguitan", "Daja Norte",
"Daja Sur", "Dingle", "Jumarap", "Lapnag", "Libas", "Linabuan Sur", "Mambog",
"Mangan", "Muguing", "Pagsanghan", "Palale", "Poblacion", "Pola", "Polocate",
"San Isidro", "Sibalow", "Sigcay", "Taba ao", "Tabayon", "Tinapuay", "Torralba",
"Ugsod", "Venturanza"
], 
                "Batan":["Ambolong", "Angas", "Bay ang", "Cabugao", "Calyang", "Camaligan", "Camanci",
"Ipil", "Lalab", "Lupit", "Magpag ong", "Magubahay", "Mambuqulao", "Man up",
"Mandong", "Napti", "Pallay", "Poblacion", "Songcolan", "Tabon"
], 
                "Buruanga":["Alagria", "Bagongbayan", "Balusbos", "Bel is", "Cabugan", "E Progreso",
"Habana", "Katipunan", "Mayapay", "Nazaroth", "Panilongan", "Poblacion",
"Santander", "Tag osip", "Tigum"
], 
                "Ibajay":["Aghago", "Agdugayan", "Antipolo", "Aparicio", "Aquino", "Aslum", "Bagacay",
"Batuan", "Buenavista", "Bugtongbato", "Cabugao", "Capilijan", "Colongcolong",
"Laguinbanua", "Mabusao", "Malindog", "Maloco", "Mina a", "Monlaque", "Nails",
"Naisud", "Naligusan", "Ondoy", "Poblacion", "Polo", "Ragador", "Rivera",
"Rizal", "San Isidro", "San Jose", "Santa Cruz", "Tagbaya", "Tul ang", "Unat",
"Yawan"
], 
                "Kalibo":["Andagaw", "Bachaw Norte", "Bachaw Sur", "Briones", "Buswang New", "Buswang Old",
"Caano", "Estancia", "Linabuan Norte", "Mabilo", "Mobo", "Nalook", "Poblacion",
"Pook", "Tigayon", "Tinigaw"
], 
                     "Lezo":["Agcawilan", "Bagto", "Bugasongan", "Carugdog", "Cogon", "Ibao", "Mina",
"Poblacion", "Santa Cruz", "Santa Cruz Bigaa", "Silakat Nonok", "Tayhhawan"
], 
                     "Libacao":["Agmailig", "Alfonso XII", "Batobato", "Bonza", "Calacablan", "Calamcan",
"Can awan", "Casit an", "Dalagsa an", "Guadalupe", "Janlud", "Julita",
"Luctoga", "Magugba", "Manika", "Ogsip", "Ortega", "Oyang", "Pampango",
"Pinonoy", "Poblacion", "Rivera", "Rosal", "Sibalew"
], 
                     "Madalag":["Alaminos", "Alas as", "Bacyang", "Balactasan", "Cabangahan", "Cabilawan",
"Catabana", "Dit ana", "Galicia", "Guinatu an", "Logohon", "Mamba",
"Maria Cristina", "Medina", "Mercedes", "Napnot", "Pang itan", "Paningayan",
"Panipiason", "Poblacion", "San Jose", "Singay", "Talangban", "Talimagao",
"Tigbawan"
], 
                     "Makato":["Agbalogo", "Aglucay", "Alibagon", "Bagong Barrio", "Baybay", "Cabatanga",
"Cajilo", "Callangcang", "Calimbajan", "Castillo", "Cayangwan", "Dumga",
"Libang", "Mantiguib", "Poblacion", "Tiblawan", "Tina","Tugas"], 
                     "Malay":["Argao", "Balabag", "Balusbus", "Cabulihan", "Caticlan", "Cogon", "Cubay Norte",
"Cubay Sur", "Dumlog", "Manoc Manoc", "Motag", "Naasug", "Nabaoy", "Napaan",
"Poblacion", "San Viray", "Yapak"
], 
                     "Malinao":["Banaybanay", "Biga a", "Bulabud", "Cabayugan", "Capataga", "Cogon", "Dangcalan",
"Kinalangay Nuevo", "Kinalangay Visjo", "Lilo an", "Malandayon", "Manhanip", "Navitas",
"Osman", "Poblacion", "Rosario", "San Dimas", "San Ramon", "San Roque", "Sipac",
"Sugnod", "Tambuan", "Tigpalas"
],
                      "Nabas":["Alimbo Baybay", "Buenatortuna", "Buenasuerte", "Buenavista", "Gibon", "Habana",
"Lasera", "Libertad", "Magallanes", "Matabana", "Nagustan", "Pawa", "Pinatuad",
"Poblacion", "Rizal", "Solido", "Tagororoc", "Toledo", "Unidos", "Union"
], 
                     "New Washington":["Candelaria", "Cawayan", "Dumaguit", "Fatima", "Guinbaliwan", "Jalas", "Jugas",
"Lawa an", "Mabilo", "Mataphao", "Ochando", "Pinamuk an", "Poblacion", "Polo",
"Puis"
], 
                     "Numancia":["Albasan", "Aliputos", "Badio", "Bubog", "Bulwang", "Camanci Norte", "Camanci Sur",
"Dongon East", "Dongon West", "Joyao joyao", "Laguinbanua East", "Laguinbanua West",
"Marianos", "Navitas", "Poblacion", "Pusiw"
], 
                     "Tangalan":["Atga", "Baybay", "Dapdap", "Dumatad", "Jawili", "Lanipga", "Napatag", "Panayakan",
"Poblacion", "Pudiot", "Tagas", "Tamalagon", "Tamokoe"
]},
            barangays: [  ]
        },
        "Albay": {
            cities: {"Bacacay":["Baclayon", "Banao", "Barangay 1", "Barangay 2", "Barangay 3", "Barangay 4", "Barangay 5",
"Barangay 6", "Barangay 7", "Barangay 8", "Barangay 9", "Barangay 10", "Barangay 11", 
"Barangay 12", "Barangay 13", "Barangay 14", "Barw", "Basud", "Bayandong", "Bonga", "Buang",
"Busdac", "Cabasan", "Cagbulacao", "Cagraray", "Cajogutan", "Cawayan", "Damacan", "Gubat llawod",
"Gubat Iraya", "Hindi", "Igang", "Langaton", "Manaot", "Mapulang Daga", "Mataas", "Misibis", 
"Nahapunan", "Namanday", "Namantao", "Napao", "Panarayon", "Pigcobohan", "Pili llawod", 
"Pili Iraya", "Pongco", "San Pablo", "San Pedro", "Sogod", "Sula", "Tambilagao", "Tambongon", 
"Tanagan", "Uson", "Vinisitahan Basud", "Vinisitahan Napao"
],
                 "Camalig":["Anoling", "Baligang", "Bantonan", "Barangay 1", "Barangay 2", "Barangay 3", "Barangay 4", 
"Barangay 5", "Barangay 6", "Barangay 7", "Banw", "Binanderahan", "Binitayan", "Bongabong", 
"Cabaghan", "Cabraran Pequeno", "Caguiba", "Calabidongan", "Comun", "Cotmon", "Del Rosario", 
"Gapo", "Gotob", "Ilawod", "Iluluan", "Libod", "Ligban", "Mabunga", "Magogon", "Manawan", 
"Maninila", "Mina", "Miti", "Palanog", "Panoypoy", "Parlaan", "Quinartilan", "Quirangay", 
"Quitinday", "Salugan", "Solong", "Sua", "Sumlang", "Tagaytay", "Tagoytoy", "Talladong", 
"Taloto", "Taplacon", "Tinago", "Tumpa"
], 
                 "Daraga":["Alcala", "Alobo", "Anislag", "Bagumbayan", "Balinad", "Bascaran", "Banadero", "Bañag", 
"Bigao", "Binitayan", "Bongalon", "Budiao", "Burgos", "Busay", "Canarom", "Cullat", "Dela Paz",
"Dinoronan", "Gabawan", "Gapo", "Ibaugan", "Ilawod Area Poblacion", "Inarado", "Kidaco", 
"Kilicao", "Kimantong", "Kinawitan", "Kiwalo", "Lacag", "Mabini", "Malabog", "Malobaga", "Maopi", 
"Market Area Poblacion", "Maroroy", "Matnog", "Mayon", "Mi isi", "Nabasan", "Namantao", "Pandan", 
"Ponatrancia", "Sagpon", "Salvacion", "San Ratael", "San Ramon", "San Roque", "San Vicente Grande", 
"San Vicente Pequeno", "Sipi", "Tabon tabon", "Tagas", "Tallahib", "Villahermosa"
], 
                 "Guinobatan":["Agpay", "Balite", "Banao", "Batbat", "Binogsacan Lower", "Binogsacan Upper", "Bololo", "Bubulusan",
"Calzada", "Catomag", "Dona Mercedes", "Doia Tomasa", "Ilawod", "Inamnan Grande", "Inamnan Pequeno", 
"Inascan", "Iraya", "Lomacao", "Maguiron", "Maipon", "Malabnig", "Malipo", "Malobago", "Maninila", 
"Mapaco", "Marcial O. Ranola", "Masarawag", "Mauraro", "Minto", "Morera", "Muladbucad Grande", 
"Muladbucad Pequeño", "Ongo", "Palanas", "Poblacion", "Pood", "Quibongbongan", "Quitago", "San Francisco", 
"San Jose", "San Ratael", "Sinungtan", "Tandarora", "Travesia"
], 
                 "Jovellar":["Aurora Poblacion", "Bagacay", "Bautista", "Cabraran", "Calzada Poblacion", "Del Rosario", "Estrella", 
"Florista", "Mabini Poblacion", "Magsaysay Poblacion", "Mamlad", "Maogog", "Mercado Poblacion", 
"Plaza Poblacion", "Quitinday Poblacion", "Rizal Poblacion", "Salvacion", "San Iidro", "San Roque", 
"San Vicente", "Sinagaran", "Villa Paz", "White Deer Poblacion"
], 
                 "Legazpi":["Barangay 1-Em's Barrio", "Barangay 10-Cabugao", "Barangay 11-Maoyod Poblacion", 
"Barangay 12-Tula tula", "Barangay 13-Ilawod West Poblacion", "Barangay 14-Ilawod Poblacion", 
"Barangay 15-Ilawod East Poblacion", "Barangay 16 Kawit East Washington Drive", 
"Barangay 17-Rizal Street, Ilawod", "Barangay 18-Cabaghan West", "Barangay 19 Cabaghan", 
"Barangay 2-Em's Barrio South", "Barangay 20 Cabaghan East","Barangay 21-Binanuahan West", "Barangay 22-Binanuahan East", "Barangay 23-Imperial Court Subd.", "Barangay 24-Rizal Street", "Barangay 25-Lapu-lapu", "Barangay 26-Dinagaan", "Barangay 27-Victory Village South", "Barangay 28-Victory Village North", "Barangay 29-Sabang", "Barangay 3-Em's Barrio East", "Barangay 30-Pigcale", "Barangay 31-Centro-Baybay", "Barangay 32-San Roque", "Barangay 33-PNR-Peñaranda St.-Iraya", "Barangay 34-Oro Site-Magallanes St.", "Barangay 35-Tinago", "Barangay 36-Kapantawan", "Barangay 37-Bitano", "Barangay 38-Gogon", "Barangay 39-Bonot", "Barangay 4-Sagpon Poblacion", "Barangay 40-Cruzada", "Barangay 41-Bogtong", "Barangay 42-Rawis", "Barangay 43-Tamaoyan", "Barangay 44-Pawa", "Barangay 45-Dita", "Barangay 46-San Joaquin", "Barangay 47-Arimbay", "Barangay 48-Bagong Abre", "Barangay 49-Bigaa", "Barangay 5-Sagmin Poblacion", "Barangay 50-Padang", "Barangay 51-Buyuan", "Barangay 52-Matanag", "Barangay 53-Bonga", "Barangay 54-Mabinit", "Barangay 55-Estanza", "Barangay 56-Taysan", "Barangay 57-Dap-dap", "Barangay 58-Buragwis", "Barangay 59-Puro", "Barangay 6-Bañadero Poblacion", "Barangay 60-Lamba", "Barangay 61-Maslog", "Barangay 62-Homapon", "Barangay 63-Mariawa", "Barangay 64-Bagacay", "Barangay 65-Imalnod", "Barangay 66-Banquerohan", "Barangay 67-Bariis", "Barangay 68-San Francisco", "Barangay 69-Buenavista", "Barangay 7-Baño", "Barangay 70-Cagbacong", "Barangay 8-Bagumbayan", "Barangay 9-Pinaric"

], 
                 "Libon":["Alongong", "Apud", "Bacolod", "Bariw", "Bonbon", "Buga", "Bulusan", "Burabod", "Caguscos", "East Carisac", "Harigue", "Libtong", "Linao", "Mabayawas", "Macabugos", "Magallang", "Malabiga", "Marayag", "Matara", "Molosbolos", "Natasan", "Niño Jesus", "Nogpo", "Pantao", "Rawis", "Sagrada Familia", "Salvacion", "Sampongan", "San Agustin", "San Antonio", "San Isidro", "San Jose", "San Pascual", "San Ramon", "San Vicente", "Santa Cruz", "Talin-talin", "Tambo", "Villa Petrona", "West Carisac", "Zone I", "Zone II", "Zone III", "Zone IV", "Zone V", "Zone VI", "Zone VII"
],
                     "Ligao":["Abella", "Allang", "Amtic", "Bacong", "Bagumbayan", "Balanac", "Baligang", "Barayong", "Basag", "Batang", "Bay", "Binanowan", "Binatagan", "Bobonsuran", "Bonga", "Busac", "Busay", "Cabarian", "Calzada", "Catburawan", "Cavasi", "Culliat", "Dunao", "Francia", "Guilid", "Herrera", "Layon", "Macalidong", "Mahaba", "Malama", "Maonon", "Nabonton", "Nasisi", "Oma-oma", "Palapas", "Pandan", "Paulba", "Paulog", "Pinamaniquian", "Pinit", "Ranao-ranao", "San Vicente", "Santa Cruz", "Tagpo", "Tambo", "Tandarura", "Tastas", "Tinago", "Tinampo", "Tiongson", "Tomolin", "Tuburan", "Tula-tula Grande", "Tula-tula Pequeño", "Tupas"
], 
                     "Malilipot":["Barangay I", "Barangay II", "Barangay III", "Barangay IV", "Barangay V", "Binitayan", "Calbayog", "Canaway", "Salvacion", "San Antonio Santicon", "San Antonio Sulong", "San Francisco", "San Isidro Ilawod", "San Isidro Iraya", "San Jose", "San Roque", "Santa Cruz", "Santa Teresa"
],
                      "Malinao":["Awang", "Bagatangki", "Bagumbayan", "Balading", "Balza", "Bariw", "Baybay", "Bulang", "Burabod", "Cabunturan", "Comun", "Diaro", "Estancia", "Jonop", "Labnig", "Libod", "Malolos", "Matalipni", "Ogob", "Pawa", "Payahan", "Poblacion", "Quinarabasahan", "Santa Elena", "Soa", "Sugcad", "Tagoytoy", "Tanawan", "Tuliw"
], 
                      "Manito":["Balabagon", "Balasbas", "Bamban", "Buyo", "Cabacongan", "Cabit", "Cawayan", "Cawit", "Holugan", "It-ba", "Malobago", "Manumbalay", "Nagotgot", "Pawa", "Tinapian"
], 
                      "Oas":["Badbad", "Badian", "Bagsa", "Bagumbayan", "Balogo", "Banao", "Bangiawon", "Bogtong", "Bongoran", "Busac", "Cadawag", "Cagmanaba", "Calaguimit", "Calpi", "Calzada", "Camagong", "Casinagan", "Centro Poblacion", "Coliat"
],
                       "Pio Duran":["Del Rosario", "Gumabao", "Ilaor Norte", "Ilaor Sur", "Iraya Norte", "Iraya Sur", "Manga", "Maporong", "Maramba", "Matambo", "Mayag", "Mayao", "Moroponros", "Nagas", "Obaliw-Rinas", "Pistola", "Ramay", "Rizal", "Saban", "San Agustin", "San Antonio", "San Isidro", "San Jose", "San Juan", "San Miguel", "San Pascual", "San Ramon", "San Vicente", "Tablon", "Talisay", "Talongog", "Tapel", "Tobgon", "Tobog"
],
                        "Polangui":["Agol", "Alabangpuro", "Banawan", "Barangay I", "Barangay II", "Barangay III", "Barangay IV", "Barangay V", "Basicao Coastal", "Basicao Interior", "Binodegahan", "Buenavista", "Buyo", "Caratagan", "Cuyaoyao", "Flores", "La Medalla", "Lawinon", "Macasitas", "Malapay", "Malidong", "Mamlad", "Marigondon", "Matanglad", "Nablangbulod", "Oringon", "Palapas", "Panganiran", "Rawis", "Salvacion", "Santo Cristo", "Sukip", "Tibabo"
], 
                     "Rapu-Rapu":["Bagaobawan", "Batan", "Bilbao", "Binosawan", "Bogtong", "Buenavista", "Buhatan", "Calanaga", "Caracaran", "Carogcog", "Dap-dap", "Gaba", "Galicia", "Guadalupe", "Hamorawon", "Lagundi", "Liguan", "Linao", "Malobago", "Mananao", "Mancao", "Manila", "Masaga", "Morocborocan", "Nagcalsot", "Pagcolbon", "Poblacion", "Sagrada", "San Ramon", "Santa Barbara", "Tinocawan", "Tinopan", "Viga", "Villahermosa"
],
                      "Santo Domingo":["Alimsog", "Bagong San Roque", "Buhatan", "Calayucay", "Del Rosario Poblacion", "Fidel Surtida", "Lidong", "Market Site Poblacion", "Nagsiya Poblacion", "Pandayan Poblacion", "Salvacion", "San Andres", "San Fernando", "San Francisco Poblacion", "San Isidro", "San Juan Poblacion", "San Pedro Poblacion", "San Rafael Poblacion", "San Roque", "San Vicente Poblacion", "Santa Misericordia", "Santo Domingo Poblacion", "Santo Niño"
],
                       "Tabaco":["Agnas", "Bacolod", "Bangkiligan", "Bantayan", "Baranghawon", "Basagan", "Basud", "Bogñabong", "Bombon", "Bonot", "Buang", "Buhian", "Cabagñan", "Cobo", "Comon", "Cormidal", "Divino Rostro", "Fatima", "Guinobat", "Hacienda", "Magapo", "Mariroc", "Matagbac", "Oras", "Oson", "Panal", "Pawa", "Pinagbobong", "Quinale Cabasan", "Quinastillojan", "Rawis", "Sagurong", "Salvacion", "San Antonio", "San Carlos", "San Isidro", "San Juan", "San Lorenzo", "San Ramon", "San Roque", "San Vicente", "Santo Cristo", "Sua-Igot", "Tabiguian", "Tagas", "Tayhi", "Visita"
], 
                       "Tiwi":["Bagumbayan", "Bariis", "Baybay", "Belen", "Biyong", "Bolo", "Cale", "Cararayan", "Coro-coro", "Dap-dap", "Gajo", "Joroan", "Libjo", "Libtong", "Matalibong", "Maynonong", "Mayong", "Misibis", "Naga", "Nagas", "Oyama", "Putsan", "San Bernardo", "Sogod", "Tigbi"]},
            barangays: [  ]
        },
        "Antique": {
            cities: {"Anini-y":["Bayo Grande", "Bayo Pequeño", "Butuan", "Casay", "Casay Viejo", "Iba", "Igbarabatuan", "Igpalge", "Igtumarom", "Lisub A", "Lisub B", "Mabuyong", "Magdalena", "Nasuli C", "Nato", "Poblacion", "Sagua", "Salvacion", "San Francisco", "San Ramon", "San Roque", "Tagaytay", "Talisayan"], 
                "Barbaza":["Baghari", "Bahuyan", "Beri", "Biga-a", "Binangbang", "Binangbang Centro", "Binanu-an", "Cadiao", "Calapadan", "Capoyuan", "Cubay", "Embrangga-an", "Esparar", "Gua", "Idao", "Igpalge", "Igtunarum", "Integasan", "Ipil", "Jinalinan", "Lanas", "Langcaon", "Lisub", "Lombuyan", "Mablad", "Magtulis", "Marigne", "Mayabay", "Mayos", "Nalusdan", "Narirong", "Palma", "Poblacion", "San Antonio", "San Ramon", "Soligao", "Tabongtabong", "Tig-alaran", "Yapo"], 
                "Belison":["Borocboroc", "Buenavista", "Concepcion", "Delima", "Ipil", "Maradiona", "Mojon", "Poblacion", "Rombang", "Salvacion", "Sinaja"], 
                "Bugasong":["Anilawan", "Arangote", "Bagtason", "Camangahan", "Centro Ilawod", "Centro Ilaya", "Centro Pojo", "Cubay North", "Cubay South", "Guija", "Igbalangao", "Igsoro", "Ilaures", "Jinalinan", "Lacayon", "Maray", "Paliwan", "Pangalcagan", "Sabang East", "Sabang West", "Tagudtud North", "Tagudtud South", "Talisay", "Tica", "Tono-an", "Yapu", "Zaragoza"], 
                "Caluya":["Alegria", "Bacong", "Banago", "Bonbon", "Dawis", "Dionela", "Harigue", "Hininga-an", "Imba", "Masanag", "Poblacion", "Sabang", "Salamento", "Semirara", "Sibato", "Sibay", "Sibolo", "Tinogboc"], 
                "Culasi":["Alojipan", "Bagacay", "Balac-balac", "Batbatan Island", "Batonan Norte", "Batonan Sur", "Bita", "Bitadton Norte", "Bitadton Sur", "Buenavista", "Buhi", "Camancijan", "Caridad", "Carit-an", "Centro Norte", "Centro Poblacion", "Centro Sur", "Condes", "Esperanza", "Fe", "Flores", "Jalandoni", "Janlagasi", "Lamputong", "Lipata", "Magsaysay", "Malacañang", "Malalison Island", "Maniguin", "Naba", "Osorio", "Paningayan", "Salde", "San Antonio", "San Gregorio", "San Juan", "San Luis", "San Pascual", "San Vicente", "Simbola", "Tigbobolo", "Tinabusan", "Tomao", "Valderama"], 
                "Hamtic":["Apdo", "Asluman", "Banawon", "Bia-an", "Bongbongan I-II", "Bongbongan III", "Botbot", "Budbudan", "Buhang", "Calacja I", "Calacja II", "Calala", "Cantulan", "Caridad", "Caromangay", "Casalngan", "Dangcalan", "Del Pilar"

                ],
                     "Laua-an":["Bagongbayan", "Banban", "Bongbongan", "Cabariwan", "Cadajug", "Canituan", "Capnayan", "Casit-an", "Guiamon", "Guinbanga-an", "Guisijan", "Igtadiao", "Intao", "Jaguikican", "Jinalinan", "Lactudan", "Latazon", "Laua-an", "Liberato", "Lindero", "Liya-liya", "Loon", "Lugta", "Lupa-an", "Magyapo", "Maria", "Mauno", "Maybunga", "Necesito", "Oloc", "Omlot", "Pandanan", "Paningayan", "Pascuala", "Poblacion", "San Ramon", "Santiago", "Tibacan", "Tigunhao", "Virginia"
                        
                     ], 
                     "Libertad":["Barusbus", "Bulanao", "Centro Este", "Centro Weste", "Codiong", "Cubay", "Igcagay", "Inyawan", "Lindero", "Maramig", "Pajo", "Panangkilon", "Paz", "Pucio", "San Roque", "Taboc", "Tinigbas", "Tinindugan", "Union"],
                     "Pandan":["Aracay", "Badiangan", "Bagumbayan", "Baybay", "Botbot", "Buang", "Cabugao", "Candari", "Carmen", "Centro Norte", "Centro Sur", "Dionela", "Dumrog", "Duyong", "Fragante", "Guia", "Idiacacan", "Jinalinan", "Luhod-Bayang", "Maadios", "Mag-aba", "Napuid", "Nauring", "Patria", "Perfecta", "San Andres", "San Joaquin", "Santa Ana", "Santa Cruz", "Santa Fe", "Santo Rosario", "Talisay", "Tingib", "Zaldivar"], 
                     "Patnongon":["Alvañiz", "Amparo", "Apgahan", "Aureliana", "Badiangan", "Bernaldo A. Julagting", "Carit-an", "Cuyapiao", "Gella", "Igbarawan", "Igbobon", "Igburi", "La Rioja", "Mabasa", "Macarina", "Magarang", "Magsaysay", "Padang", "Pandanan", "Patlabawon", "Poblacion", "Quezon", "Salaguiawan", "Samalague", "San Rafael", "Tamayoc", "Tigbalogo", "Tobias Fornier", "Villa Crespo", "Villa Cruz", "Villa Elio", "Villa Flores", "Villa Laua-an", "Villa Sal", "Villa Salomon", "Vista Alegre"], 
                     "San Jose de Buenavista":["Atabay", "Badiang", "Barangay 1", "Barangay 2", "Barangay 3", "Barangay 4", "Barangay 5", "Barangay 6", "Barangay 7", "Barangay 8", "Bariri", "Bugarot", "Cansadan", "Durog", "Funda-Dalipe", "Igbonglo", "Inabasan", "Madrangca", "Magcalon", "Malaiba", "Maybato Norte", "Maybato Sur", "Mojon", "Pantao", "San Angel", "San Fernando", "San Pedro", "Supa"], 
                     "San Remigio":["Agricula", "Alegria", "Aningalan", "Atabay", "Bagumbayan", "Baladjay", "Banbanan", "Barangbang", "Bawang", "Bugo", "Bulan-bulan", "Cabiawan", "Cabunga-an", "Cadolonan", "Carawisan I", "Carawisan II", "Carmelo I", "Carmelo II", "General Fullon", "General Luna", "Iguirindon", "Insubuan", "La Union", "Lapak", "Lumpatan", "Magdalena", "Maragubdub", "Nagbangi I","Nagbangi II", "Nasuli", "Orquia", "Osorio I", "Osorio II", "Panpanan I", "Panpanan II", "Poblacion", "Ramon Magsaysay", "Rizal", "San Rafael", "Sinundolan", "Sumaray", "Trinidad", "Tubudan", "Vilvar", "Walker"], 
                     "Sebaste":["Abiera", "Aguila", "Alegre", "Aras-asan", "Bacalan", "Callan", "Idio", "Nauhon", "P. Javier", "Poblacion"], 
                     "Sibalom":["Alangan", "Bari", "Biga-a", "Bongbongan I", "Bongbongan II", "Bongsod", "Bontol", "Bugnay", "Bulalacao", "Cabanbanan", "Cabariuan", "Cabladan", "Cadoldolan", "Calo-oy", "Calog", "Catmon", "Catungan I", "Catungan II", "Catungan III", "Catungan IV", "Cubay-Napultan", "Cubay-Sermon", "District I", "District II", "District III", "District IV", "Egaña", "Esperanza I", "Esperanza II", "Esperanza III", "Igcococ", "Igdagmay", "Igdalaquit", "Iglanot", "Igpanolong", "Igparas", "Igsuming", "Ilabas", "Imparayan", "Inabasan", "Indag-an", "Initan", "Insarayan", "Lacaron", "Lagdo", "Lambayagan", "Luna", "Luyang", "Maasin", "Mabini", "Millamena", "Mojon", "Nagdayao", "Nazareth", "Odiong", "Olaga", "Pangpang", "Panlagangan", "Pantao", "Pasong", "Pis-anan", "Rombang", "Salvacion", "San Juan", "Sido", "Solong", "Tabongtabong", "Tig-ohot", "Tigbalua I", "Tigbalua II", "Tordesillas", "Tulatula", "Valentin Grasparil", "Villafont", "Villahermosa", "Villar"], 
                     "Tibiao":["Alegre", "Amar", "Bandoja", "Castillo", "Esparagoza", "Importante", "La Paz", "Malabor", "Martinez", "Natividad", "Pitac", "Poblacion", "Salazar", "San Francisco Norte", "San Francisco Sur", "San Isidro", "Santa Ana", "Santa Justa", "Santo Rosario", "Tigbaboy", "Tuno"], 
                     "Tobias Fornier":["Abaca", "Aras-asan", "Arobo", "Atabay", "Atiotes", "Bagumbayan", "Balloscas", "Balud", "Barasanan A", "Barasanan B", "Barasanan C", "Bariri", "Camandagan", "Cato-ogan", "Danawan", "Diclum", "Fatima", "Gamad", "Igbalogo", "Igbangcal-A", "Igbangcal-B", "Igbangcal-C", "Igcabuad", "Igcadac", "Igcado", "Igcalawagan", "Igcapuyas", "Igcasicad", "Igdalaguit", "Igdanlog", "Igdurarog", "Igtugas", "Lawigan", "Lindero", "Manaling", "Masayo", "Nagsubuan", "Nasuli-A", "Opsan", "Paciencia", "Poblacion Norte", "Poblacion Sur", "Portillo", "Quezon", "Salamague", "Santo Tomas", "Tacbuyan", "Tene", "Villaflor", "Ysulat"], 
                     "Valderrama":["Alon", "Bakiang", "Binanogan", "Borocboroc", "Bugnay", "Buluangan I", "Buluangan II", "Bunsod", "Busog", "Cananghan", "Canipayan", "Cansilayan", "Culyat", "Iglinab", "Igmasandig", "Lublub", "Manlacbo", "Pandanan", "San Agustin", "Takas", "Tigmamale", "Ubos"]},
            barangays: [  ]
        },
        "Apayao": {
            cities: {"Calanasan":["Butao", "Cadaclan", "Don Roque Ablan Sr.", "Eleazar", "Eva Puzon", "Kabugawan", "Langnao", "Lubong", "Macalino", "Naguilian", "Namaltugan", "Poblacion", "Sabangan", "Santa Elena", "Santa Filomena", "Tanglagan", "Tubang", "Tubongan"], 
                "Conner":["Allangigan", "Banban", "Buluan", "Caglayan", "Calafug", "Cupis", "Daga", "Guinaang", "Guinamgaman", "Ili", "Karikitan", "Katablangan", "Malama", "Manag", "Mawegui", "Nabuangan", "Paddaoan", "Puguin", "Ripang", "Sacpil", "Talifugo"], 
                "Flora":["Allig", "Anninipan", "Atok", "Bagutong", "Balasi", "Balluyan", "Malayugan", "Mallig", "Malubibit Norte", "Malubibit Sur", "Poblacion East", "Poblacion West", "San Jose", "Santa Maria", "Tamalunog", "Upper Atok"], 
                "Kabugao":["Badduat", "Baliwanan", "Bulu", "Cabetayan", "Dagara", "Dibagat", "Karagawan", "Kumao", "Laco", "Lenneng", "Lucab", "Luttuacan", "Madatag", "Madduang", "Magabta", "Maragat", "Musimut", "Nagbabalayan", "Poblacion", "Tuyangan", "Waga"], 
                "Luna":["Bacsay", "Cagandungan", "Calabigan", "Cangisitan", "Capagaypayan", "Dagupan", "Lappa", "Luyon", "Marag", "Poblacion", "Quirino", "Salvacion", "San Francisco", "San Gregorio", "San Isidro Norte", "San Isidro Sur", "San Sebastian", "Santa Lina", "Shalom", "Tumog", "Turod", "Zumigui"], 
                "Pudtol":["Aga", "Alem", "Amado", "Aurora", "Cabatacan", "Cacalaggan", "Capannikian", "Doña Loreta", "Emilia", "Imelda", "Lower Maton", "Lt. Balag", "Lydia", "Malibang", "Mataguisi", "Poblacion", "San Antonio", "San Jose", "San Luis", "San Mariano", "Swan", "Upper Maton"], 
                "Santa Marcela":["Barocboc", "Consuelo", "Emiliana", "Imelda", "Malekkeg", "Marcela", "Nueva", "Panay", "San Antonio", "San Carlos", "San Juan", "San Mariano", "Sipa Proper"]},
            barangays: [  ]
        },
        "Aurora": {
            cities: {"Baler":["Barangay I", "Barangay II", "Barangay III", "Barangay IV", "Barangay V", "Buhangin", "Calabuanan", "Obligacion", "Pingit", "Reserva", "Sabang", "Suclayin", "Zabali"], 
                "Casiguran":["Barangay 1", "Barangay 2", "Barangay 3", "Barangay 4", "Barangay 5", "Barangay 6", "Barangay 7", "Barangay 8", "Bianuan", "Calabgan", "Calangcuasan", "Calantas", "Cozo", "Culat", "Dibacong", "Dibet", "Ditinagyan", "Esperanza", "Esteves", "Lual", "Marikit", "San Ildefonso", "Tabas", "Tinib"],
                "Dilasag":["Diagyan", "Dicabasan", "Dilaguidi", "Dimaseset", "Diniog", "Esperanza", "Lawang", "Maligaya", "Manggitahan", "Masagana", "Ura"], 
                "Dinalungan":["Abuleg", "Dibaraybay", "Ditawini", "Mapalad", "Nipoo", "Paleg", "Simbahan", "Zone I", "Zone II"], 
                "Dingalan":["Aplaya", "Butas na Bato", "Cabog", "Caragsacan", "Davildavilan", "Dikapanikian", "Ibona", "Paltic", "Poblacion", "Tanawan", "Umiray"], 
                "Dipaculao":["Bayabas", "Borlongan", "Buenavista", "Calaocan", "Diamanen", "Dianed", "Diarabasin", "Dibutunan", "Dimabuno", "Dinadiawan", "Ditale", "Gupa", "Ipil", "Laboy", "Lipit", "Lobbot", "Maligaya", "Mijares", "Mucdol", "North Poblacion", "Puangi", "Salay", "Sapangkawayan", "South Poblacion", "Toytoyan"], 
                     "Maria Aurora":["Alcala", "Bagtu", "Bangco", "Bannawag", "Barangay I", "Barangay II", "Barangay III", "Barangay IV", "Baubo", "Bayanihan", "Bazal", "Cabituculan East", "Cabituculan West", "Cadayacan", "Debucao", "Decoliat", "Detailen", "Diaat", "Dialatman", "Diaman", "Dianawan", "Dikildit", "Dimanpudso", "Diome", "Estonilo", "Florida", "Galintuja", "Malasin", "Ponglo", "Quirino", "Ramada", "San Joaquin", "San Jose", "San Juan", "San Leonardo", "Santa Lucia", "Santo Tomas", "Suguit", "Villa Aurora", "Wenceslao"],
                      "San Luis":["Bacong", "Barangay I", "Barangay II", "Barangay III", "Barangay IV", "Dibalo", "Dibayabay", "Dibut", "Dikapinisan", "Dimanayat", "Diteki", "Ditumabo", "L. Pimentel", "Nonong Senior", "Real", "San Isidro", "San Jose", "Zarah"]},
            barangays: [  ]
        },
        "Basilan": {
            cities: {"Akbar":["Caddayan", "Linongan", "Lower Bato-bato", "Mangalut", "Manguso", "Paguengan", "Semut", "Upper Bato-bato", "Upper Sinangkapan"],
                "Al-Barka":["Apil-apil", "Bato-bato", "Bohe-Piang", "Bucalao", "Cambug", "Danapah", "Guinanta", "Kailih", "Kinukutan", "Kuhon", "Kuhon Lennuh", "Linuan", "Lookbisaya", "Macalang", "Magcawa", "Sangkahan"],
                "Hadji Mohammad Ajul":["Basakan", "Buton", "Candiis", "Langil", "Langong", "Languyan", "Pintasan", "Seronggon", "Sibago", "Sulutan Matangal", "Tuburan Proper"],
                "Hadji Muhtamad":["Baluk-baluk", "Dasalan", "Lubukan", "Luukbongsod", "Mananggal", "Palahangan", "Panducan", "Sangbay Big", "Sangbay Small", "Tausan"],
                "Isabela":[ "Aguada", "Balatanay", "Baluno", "Begang", "Binuangan", "Busay", "Cabunbata", "Calvario", "Carbon", "Diki", "Doña Ramona T. Alano", "Isabela Eastside", "Isabela Proper", "Kapatagan Grande", "Kapayawan", "Kaumpurnah Zone I", "Kaumpurnah Zone II", "Kaumpurnah Zone III", "Kumalarang", "La Piedad", "Lampinigan", "Lanote", "Lukbuton", "Lumbang", "Makiri", "Maligue", "Marang-marang", "Marketsite", "Masula", "Menzi", "Panigayan", "Panunsulan", "Port Area", "Riverside", "San Rafael", "Santa Barbara", "Santa Cruz", "Seaside", "Small Kapatagan", "Sumagdang", "Sunrise Village", "Tabiawan", "Tabuk", "Tampalan", "Timpul"], 
                "Lamitan":["Arco", "Ba-as", "Baimbing", "Balagtasan", "Balas", "Balobo", "Bato", "Baungos", "Bohebessey", "Boheibu", "Bohenange", "Bohesapa", "Boheyakan", "Boheyawas", "Buahan", "Bulanting", "Bulingan", "Cabobo", "Calugusan", "Campo Uno", "Colonia", "Danit-Puntocan", "Kulay Bato", "Lebbuh", "Limo-ok", "Lo-ok", "Luksumbang", "Lumuton", "Maganda", "Malakas", "Maligaya", "Malinis", "Malo-ong Canal", "Malo-ong San Jose", "Matatag", "Matibay", "Parangbasak", "Sabong", "Santa Clara", "Sengal", "Simbangon", "Tandong Ahas", "Tumakid", "Ubit", "Ulame"], 
                "Maluso":["Abong-Abong", "Batungal", "Calang Canas", "Fuente Maluso", "Guanan North", "Guanan South", "Limbubong", "Mahayahay Lower", "Mahayahay Upper", "Muslim Area", "Port Holland Zone I Poblacion", "Port Holland Zone II Poblacion", "Port Holland Zone III Poblacion", "Port Holland Zone IV", "Port Holland Zone V", "Taberlongan", "Tamuk", "Townsite", "Tubigan", "Upper Garlayan"], 
                "Sumisip":["Bacung", "Baiwas", "Basak", "Benembengan Lower", "Benembengan Upper", "Bohe-languyan", "Buli-buli", "Cabcaban", "Cabengbeng Lower", "Cabengbeng Upper", "Ettub-ettub", "Guiong", "Kaum-Air", "Kaumpamatsakem", "Libug", "Limbocandis", "Lukketon", "Luuk-Bait", "Mahatalang", "Manaul", "Mangal", "Marang", "Mebak", "Sahaya Bohe Bato", "Sapah Bulak", "Sumisip Central", "Tikus", "Tongsengal", "Tumahubong"], 
                "Tabuan-Lasa":["Babag", "Balanting", "Boloh-boloh", "Bukut-Umus", "Kaumpurnah", "Lanawan", "Pisak-pisak", "Saluping", "Suligan", "Sulloh", "Tambulig Buton", "Tong-Umus"], 
                "Tipo-Tipo":[ "Badja", "Baguindan", "Banah", "Bangcuang", "Bohe-Tambak", "Bohebaca", "Bohelebung", "Lagayas", "Limbo-Upas", "Silangkum", "Tipo-tipo Proper"], 
                "Tuburan":["Bohetambis", "Calut", "Duga-a", "Katipunan", "Lahi-lahi", "Lower Sinangkapan", "Lower Tablas", "Mahawid", "Sinulatan", "Tablas Usew"],
                "Ungkaya Pukan":["Amaloy", "Bohe-Pahuh", "Bohe-Suyak", "Cabangalan", "Danit", "Kamamburingan", "Matata", "Materling", "Pipil", "Sungkayut", "Tongbato", "Ulitan"]},
            barangays: [  ]
        },
        "Bataan": {
            cities: {"Abucay":[ "Bangkal", "Calaylayan", "Capitangan", "Gabon", "Laon", "Mabatang", "Omboy", "Salian", "Wawa"], 
                "Bagac":["Atilano L. Ricardo", "Bagumbayan", "Banawang", "Binuangan", "Binukawan", "Ibaba", "Ibis", "Pag-asa", "Parang", "Paysawan", "Quinawan", "San Antonio", "Saysain", "Tabing-Ilog"],
                "Balanga":[ "Bagong Silang", "Bagumbayan", "Cabog-Cabog", "Camacho", "Cataning", "Central", "Cupang North", "Cupang Proper", "Cupang West", "Dangcol", "Doña Francisca", "Ibayo", "Lote", "Malabia", "Munting Batangas", "Poblacion", "Pto. Rivas Ibaba", "Pto. Rivas Itaas", "San Jose", "Sibacan", "Talisay", "Tanato", "Tenejero", "Tortugas", "Tuyo"], 
                "Dinalupihan":["Aquino", "Bangal", "Bayan-bayanan", "Bonifacio", "Burgos", "Colo", "Daang Bago", "Dalao", "Del Pilar", "Gen. Luna", "Gomez", "Happy Valley", "Jose C. Payumo, Jr.", "Kataasan", "Layac", "Luacan", "Mabini Ext.", "Mabini Proper", "Magsaysay", "Maligaya", "Naparing", "New San Jose", "Old San Jose", "Padre Dandan", "Pag-asa", "Pagalanggang", "Payangan", "Pentor", "Pinulot", "Pita", "Rizal", "Roosevelt", "Roxas", "Saguing", "San Benito", "San Isidro", "San Pablo", "San Ramon", "San Simon", "Santa Isabel", "Santo Niño", "Sapang Balas", "Torres Bugauen", "Tubo-tubo", "Tucop", "Zamora"],
                 "Hermosa":["A. Rivera", "Almacen", "Bacong", "Balsic", "Bamban", "Burgos-Soliman", "Cataning", "Culis", "Daungan", "Judge Roman Cruz Sr.", "Mabiga", "Mabuco", "Maite", "Mambog-Mandama", "Palihan", "Pandatung", "Pulo", "Saba", "Sacrifice Valley", "San Pedro", "Santo Cristo", "Sumalo", "Tipo"],
                  "Limay":["Alangan", "Duale", "Kitang 2 & Luz", "Kitang I", "Lamao", "Landing", "Poblacion", "Reformista", "Saint Francis II", "San Francisco de Asis", "Townsite", "Wawa"], 
                  "Mariveles":["Alas-asin", "Alion", "Balon-Anito", "Baseco Country", "Batangas II", "Biaan", "Cabcaben", "Camaya", "Ipag", "Lucanin", "Malaya", "Maligaya", "Mt. View", "Poblacion", "San Carlos", "San Isidro", "Sisiman", "Townsite"],
                     "Morong":["Binaritan", "Mabayo", "Nagbalayong", "Poblacion", "Sabang"], 
                     "Orani":["Apollo", "Bagong Paraiso", "Balut", "Bayan", "Calero", "Centro I", "Centro II", "Dona", "Kabalutan", "Kaparangan", "Maria Fe", "Masantol", "Mulawin", "Pag-asa", "Paking-Carbonero", "Palihan", "Pantalan Bago", "Pantalan Luma", "Parang Parang", "Puksuan", "Sibul", "Silahis", "Tagumpay", "Tala", "Talimundoc", "Tapulao", "Tenejero", "Tugatog", "Wawa"], 
                     "Orion":["Arellano", "Bagumbayan", "Balagtas", "Balut", "Bantan", "Bilolo", "Calungusan", "Camachile", "Daang Bago", "Daang Bilolo", "Daang Pare", "General Lim", "Kapunitan", "Lati", "Lusungan", "Puting Buhangin", "Sabatan", "San Vicente", "Santa Elena", "Santo Domingo", "Villa Angeles", "Wakas", "Wawa"], 
                     "Pilar":["Ala-uli", "Bagumbayan", "Balut I", "Balut II", "Bantan Munti", "Burgos", "Del Rosario", "Diwa", "Landing", "Liyang", "Nagwaling", "Panilao", "Pantingan", "Poblacion", "Rizal", "Santa Rosa", "Wakas North", "Wakas South", "Wawa"], 
                     "Samal":[ "East Calaguiman", "East Daang Bago", "Gugo", "Ibaba", "Imelda", "Lalawigan", "Palili", "San Juan", "San Roque", "Santa Lucia", "Sapa", "Tabing Ilog", "West Calaguiman", "West Daang Bago"]},
            barangays: [  ]
        },
        "Batanes": {
            cities: {"Basco":["Chanarian", "Ihubok I", "Ihubok II", "Kayhuvokan", "San Antonio", "San Joaquin"], 
                "Ivana":["Raele", "San Rafael", "Santa Lucia", "Santa Maria", "Santa Rosa"], 
                "Mahatao":["Radiwan", "Salagao", "San Vicente", "Tuhel"], 
                "Sabtang":["Hañib", "Kaumbakan", "Panatayan", "Uvoy"], 
                "Uyugan":["Chavayan", "Malakdang", "Nakanmuan", "Savidug", "Sinakan", "Sumnanga"]},
            barangays: [  ]
        },
        "Batangas": {
            cities: {"Agoncillo":["Adia", "Bagong Sikat", "Balangon", "Bangin", "Banyaga", "Barigon", "Bilibinwang", "Coral na Munti", "Guitna", "Mabini", "Pamiga", "Panhulan", "Pansipit", "Poblacion", "Pook", "San Jacinto", "San Teodoro", "Santa Cruz", "Santo Tomas", "Subic Ibaba", "Subic Ilaya"],
                "Alitagtag":["Balagbag", "Concepcion", "Concordia", "Dalipit East", "Dalipit West", "Dominador East", "Dominador West", "Munlawin Norte", "Munlawin Sur", "Muzon Primero", "Muzon Segundo", "Pinagkurusan", "Ping-as", "Poblacion East", "Poblacion West", "San Jose", "San Juan", "Santa Cruz", "Tadlac"], 
                "Balayan":[ "Baclaran", "Barangay 1", "Barangay 10", "Barangay 11", "Barangay 12", "Barangay 2", "Barangay 3", "Barangay 4", "Barangay 5", "Barangay 6", "Barangay 7", "Barangay 8", "Barangay 9", "Calan", "Caloocan", "Calzada", "Canda", "Carenahan", "Caybunga", "Cayponce", "Dalig", "Dao", "Dilao", "Duhatan", "Durungao", "Gimalas", "Gumamela", "Lagnas", "Lanatan", "Langgangan", "Lucban Pook", "Lucban Putol", "Magabe", "Malalay", "Munting Tubig", "Navotas", "Palikpikan", "Patugo", "Pooc", "Sambat", "Sampaga", "San Juan", "San Piro", "Santol", "Sukol", "Tactac", "Taludtud", "Tanggoy"], 
                "Balete":["Alangilan", "Calawit", "Looc", "Magapi", "Makina", "Malabanan", "Paligawan", "Palsara", "Poblacion", "Sala", "Sampalocan", "San Sebastian", "Solis"],
                "Batangas City":["Alangilan", "Balagtas", "Balete", "Banaba Center", "Banaba Ibaba", "Banaba Kanluran", "Banaba Silangan", "Barangay 1", "Barangay 10", "Barangay 11", "Barangay 12", "Barangay 13", "Barangay 14", "Barangay 15", "Barangay 16", "Barangay 17", "Barangay 18", "Barangay 19", "Barangay 2", "Barangay 20", "Barangay 21", "Barangay 22", "Barangay 23", "Barangay 24", "Barangay 3", "Barangay 4", "Barangay 5", "Barangay 6", "Barangay 7", "Barangay 8", "Barangay 9", "Bilogo", "Bolbok", "Bukal", "Calicanto", "Catandala", "Concepcion", "Conde Itaas", "Conde Labak", "Cuta", "Dalig", "Dela Paz", "Dela Paz Pulot Aplaya", "Dela Paz Pulot Itaas", "Domoclay", "Dumantay", "Gulod Itaas", "Gulod Labak", "Haligue Kanluran", "Haligue Silangan", "Ilihan", "Kumba", "Kumintang Ibaba", "Kumintang Ilaya", "Libjo", "Liponpon", "Maapas", "Mabacong", "Mahabang Dahilig", "Mahabang Parang", "Mahacot Kanluran", "Mahacot Silangan", "Malalim", "Malibayo", "Malitam", "Maruclap", "Pagkilatan", "Paharang Kanluran", "Paharang Silangan", "Pallocan Kanluran", "Pallocan Silangan", "Pinamucan", "Pinamucan Ibaba", "Pinamucan Silangan", "Sampaga", "San Agapito", "San Agustin Kanluran", "San Agustin Silangan", "San Andres", "San Antonio", "San Isidro", "San Jose Sico", "San Miguel", "San Pedro", "Santa Clara", "Santa Rita Aplaya", "Santa Rita Karsada", "Santo Domingo", "Santo Niño", "Simlong", "Sirang Lupa", "Sorosoro Ibaba", "Sorosoro Ilaya", "Sorosoro Karsada", "Tabangao Ambulong", "Tabangao Aplaya", "Tabangao Dao", "Talahib Pandayan", "Talahib Payapa", "Talumpok Kanluran", "Talumpok Silangan", "Tinga Itaas", "Tinga Labak", "Tulo", "Wawa"], 
                "Bauan":["Alagao", "Aplaya", "As-is", "Bagong Silang", "Baguilawa", "Balayong", "Barangay I", "Barangay II", "Barangay III", "Barangay IV", "Bolo", "Colvo", "Cupang", "Durungao", "Gulibay", "Inicbulan", "Locloc", "Magalang-Galang", "Malindig", "Manalupong", "Manghinao Proper", "Manghinao Uno", "New Danglayan", "Orense", "Pitugo", "Rizal", "Sampaguita", "San Agustin", "San Andres Proper", "San Andres Uno", "San Diego", "San Miguel", "San Pablo", "San Pedro", "San Roque", "San Teodoro", "San Vicente", "Santa Maria", "Santo Domingo", "Sinala"
], 
                "Calaca":["Baclas", "Bagong Tubig", "Balimbing", "Bambang", "Barangay 1", "Barangay 2", "Barangay 3", "Barangay 4", "Barangay 5", "Barangay 6", "Bisaya", "Cahil", "Calantas", "Caluangan", "Camastilisan", "Coral ni Bacal", "Coral ni Lopez", "Dacanlao", "Dila", "Loma", "Lumbang Calzada", "Lumbang na Bata", "Lumbang na Matanda", "Madalunot", "Makina", "Matipok", "Munting Coral", "Niyugan", "Pantay", "Puting Bato East", "Puting Bato West", "Puting Kahoy", "Quisumbing", "Salong", "San Rafael", "Sinisian", "Taklang Anak", "Talisay", "Tamayo", "Timbain"
],
                 "Calatagan":["Bagong Silang", "Baha", "Balibago", "Balitoc", "Barangay 1", "Barangay 2", "Barangay 3", "Barangay 4", "Biga", "Bucal", "Carlosa", "Carretunan", "Encarnacion", "Gulod", "Hukay", "Lucsuhin", "Luya", "Paraiso", "Quilitisan", "Real", "Sambungan", "Santa Ana", "Talibayog", "Talisay", "Tanagan"
], 
                     "Cuenca":["Balagbag", "Barangay 1", "Barangay 2", "Barangay 3", "Barangay 4", "Barangay 5", "Barangay 6", "Barangay 7", "Barangay 8", "Bungahan", "Calumayin", "Dalipit East", "Dalipit West", "Dita", "Don Juan", "Emmanuel", "Ibabao", "Labac", "Pinagkaisahan", "San Felipe", "San Isidro"
], 
                     "Ibaan":["Bago", "Balanga", "Bungahan", "Calamias", "Catandala", "Coliat", "Dayapan", "Lapu-lapu", "Lucsuhin", "Mabalor", "Malainin", "Matala", "Munting-Tubig", "Palindan", "Pangao", "Panghayaan", "Poblacion", "Quilo", "Sabang", "Salaban I", "Salaban II", "San Agustin", "Sandalan", "Santo Niño", "Talaibon", "Tulay na Patpat"
],
                     "Laurel":["As-is", "Balakilong","Barangay 1", "Barangay 2", "Barangay 3", "Barangay 4", "Barangay 5", "Berinayan", "Bugaan East", "Bugaan West", "Buso-buso", "Dayap Itaas", "Gulod", "J. Leviste", "Molinete", "Niyugan", "Paliparan", "San Gabriel", "San Gregorio", "Santa Maria", "Ticub"
],
                     "Lemery":["Anak-Dagat", "Arumahan", "Ayao-iyao", "Bagong Pook", "Bagong Sikat", "Balanga", "Bukal", "Cahilan I", "Cahilan II", "Dayapan", "District I", "District II", "District III", "District IV", "Dita", "Gulod", "Lucky", "Maguihan", "Mahabang Dahilig", "Mahayahay", "Maigsing Dahilig", "Maligaya", "Malinis", "Masalisi", "Mataas na Bayan", "Matingain I", "Matingain II", "Mayasang", "Niugan", "Nonong Casto", "Palanas", "Payapa Ibaba", "Payapa Ilaya", "Rizal", "Sambal Ibaba", "Sambal Ilaya", "San Isidro Ibaba", "San Isidro Itaas", "Sangalang", "Sinisian East", "Sinisian West", "Talaga", "Tubigan", "Tubuan", "Wawa Ibaba", "Wawa Ilaya"
],
                      "Lian":["Bagong Pook", "Balibago", "Barangay 1", "Barangay 2", "Barangay 3", "Barangay 4", "Barangay 5", "Binubusan", "Bungahan", "Cumba", "Humayingan", "Kapito", "Lumaniag", "Luyahan", "Malaruhatan", "Matabungkay", "Prenza", "Puting-Kahoy", "San Diego"
], 
                      "Lipa":["Adya", "Anilao", "Anilao-Labac", "Antipolo del Norte", "Antipolo del Sur", "Bagong Pook", "Balintawak", "Banaybanay", "Barangay 12", "Bolbok", "Bugtong na Pulo", "Bulacnin", "Bulaklakan", "Calamias", "Cumba", "Dagatan", "Duhatan", "Halang", "Inosloban", "Kayumanggi", "Latag", "Lodlod", "Lumbang", "Mabini", "Malagonlong", "Malitlit", "Marauoy", "Mataas na Lupa", "Munting Pulo", "Pagolingin Bata", "Pagolingin East", "Pagolingin West", "Pangao", "Pinagkawitan", "Pinagtongulan", "Plaridel", "Poblacion Barangay 1", "Poblacion Barangay 10", "Poblacion Barangay 11", "Poblacion Barangay 2", "Poblacion Barangay 3", "Poblacion Barangay 4", "Poblacion Barangay 5", "Poblacion Barangay 6", "Poblacion Barangay 7", "Poblacion Barangay 8", "Poblacion Barangay 9", "Poblacion Barangay 9-A", "Pusil", "Quezon", "Rizal", "Sabang", "Sampaguita", "San Benito", "San Carlos", "San Celestino", "San Francisco", "San Guillermo", "San Jose", "San Lucas", "San Salvador", "San Sebastian", "Santo Niño", "Santo Toribio", "Sapac", "Sico", "Talisay", "Tambo", "Tangob", "Tanguay", "Tibig", "Tipacan"
], 
                      "Lobo":["Apar", "Balatbat", "Balibago", "Banalo", "Biga", "Bignay", "Calo", "Calumpit", "Fabrica", "Jaybanga", "Lagadlarin", "Mabilog na Bundok", "Malabrigo", "Malalim na Sanog", "Malapad na Parang", "Masaguitsit", "Nagtalongtong", "Nagtoctoc", "Olo-olo", "Pinaghawanan", "Poblacion", "San Miguel", "San Nicolas", "Sawang", "Soloc", "Tayuman"
], 
                      "Mabini":["Anilao East", "Anilao Proper", "Bagalangit", "Bulacan", "Calamias", "Estrella", "Gasang", "Laurel", "Ligaya", "Mainaga", "Mainit", "Majuben", "Malimatoc I", "Malimatoc II", "Nag-iba", "Pilahan", "Poblacion", "Pulang Lupa", "Pulong Anahao", "Pulong Balibaguhan", "Pulong Niogan", "Saguing", "Sampaguita", "San Francisco", "San Jose", "San Juan", "San Teodoro", "Santa Ana", "Santa Mesa", "Santo Niño", "Santo Tomas", "Solo", "Talaga East", "Talaga Proper"
], 
                      "Malvar":["Bagong Pook", "Bilucao", "Bulihan", "Luta del Norte", "Luta del Sur", "Poblacion", "San Andres", "San Fernando", "San Gregorio", "San Isidro East", "San Juan", "San Pedro I", "San Pedro II", "San Pioquinto", "Santiago"
], 
                     "Mataasnakahoy":["Barangay II-A", "Bayorbor", "Bubuyan", "Calingatan", "District I", "District II", "District III", "District IV", "Kinalaglagan", "Loob", "Lumang Lipa", "Manggahan", "Nangkaan", "San Sebastian", "Santol", "Upa"
],
                      "Nasugbu":["Aga", "Balaytigui", "Banilad", "Barangay 1", "Barangay 10", "Barangay 11", "Barangay 12", "Barangay 2", "Barangay 3", "Barangay 4", "Barangay 5", "Barangay 6", "Barangay 7", "Barangay 8", "Barangay 9", "Bilaran", "Bucana", "Bulihan", "Bunducan", "Butucan", "Calayo", "Catandaan", "Cogunan", "Dayap", "Kaylaway", "Kayrilaw", "Latag", "Looc", "Lumbangan", "Malapad na Bato", "Mataas na Pulo", "Maugat", "Munting Indan", "Natipuan", "Pantalan", "Papaya", "Putat", "Reparo", "Talangan", "Tumalim", "Utod", "Wawa"
], 
                      "Padre Garcia":["Banaba", "Banaybanay", "Bawi", "Bukal", "Castillo", "Cawongan", "Manggas", "Maugat East", "Maugat West", "Pansol", "Payapa", "Poblacion", "Quilo-quilo North", "Quilo-quilo South", "San Felipe", "San Miguel", "Tamak", "Tangob"
], 
                      "Rosario":["Alupay", "Antipolo", "Bagong Pook", "Balibago", "Barangay A", "Barangay B", "Barangay C", "Barangay D", "Barangay E", "Bayawang", "Baybayin", "Bulihan", "Cahigam", "Calantas", "Colongan", "Itlugan", "Leviste", "Lumbangan", "Maalas-as", "Mabato", "Mabunga", "Macalamcam A", "Macalamcam B", "Malaya", "Maligaya", "Marilag", "Masaya", "Matamis", "Mavalor", "Mayuro", "Namuco", "Namunga", "Nasi", "Natu", "Palakpak", "Pinagsibaan", "Putingkahoy", "Quilib", "Salao", "San Carlos", "San Ignacio", "San Isidro", "San Jose", "San Roque", "Santa Cruz", "Timbugan", "Tiquiwan", "Tulos"
], 
                      "San Jose":["Balagtasin I", "Banaybanay I", "Banaybanay II", "Bigain I", "Bigain II", "Bigain South", "Calansayan", "Dagatan", "Don Luis", "Galamay-Amo", "Lalayat", "Lapolapo I", "Lapolapo II", "Lepute", "Lumil", "Mojon-Tampoy", "Natunuan", "Palanca", "Pinagtung-ulan", "Poblacion Barangay I", "Poblacion Barangay II", "Poblacion Barangay III", "Poblacion Barangay IV", "Sabang", "Salaban", "Santo Cristo", "Taysan", "Tugtug"
], 
                     "San Juan":["Abung", "Balagbag", "Barualte", "Bataan", "Buhay na Sapa", "Bulsa", "Calicanto", "Calitcalit", "Calubcub I", "Calubcub II", "Catmon", "Coloconto", "Escribano", "Hugom", "Imelda", "Janaojanao", "Laiya-Aplaya", "Laiya-Ibabao", "Libato", "Lipahan", "Mabalanoy", "Maraykit", "Muzon", "Nagsaulay", "Palahanan I", "Palahanan II", "Palingowak", "Pinagbayanan", "Poblacion", "Poctol", "Pulangbato", "Putingbuhangin", "Quipot", "Sampiro", "Sapangan", "Sico I", "Sico II", "Subukin", "Talahiban I", "Talahiban II", "Ticalan", "Tipaz"
], 
                     "San Luis":["Abiacao", "Bagong Tubig", "Balagtasin", "Balite", "Banoyo", "Boboy", "Bonliw", "Calumpang East", "Calumpang West", "Dulangan", "Durungao", "Locloc", "Luya", "Mahabang Parang", "Manggahan", "Muzon", "Poblacion", "San Antonio", "San Isidro", "San Jose", "San Martin", "Santa Monica", "Taliba", "Talon", "Tejero", "Tungal"
], 
                     "San Nicolas":["Abelo", "Alas-as", "Balete", "Baluk-baluk", "Bancoro", "Bangin", "Calangay", "Hipit", "Maabud North", "Maabud South", "Munlawin", "Pansipit", "Poblacion", "Pulang-Bato", "Santo Niño", "Sinturisan", "Tagudtod", "Talang"
    ],
                      "San Pascual":["Alalum", "Antipolo", "Balimbing", "Banaba", "Bayanan", "Danglayan", "Del Pilar", "Gelerang Kawayan", "Ilat North", "Ilat South", "Kaingin", "Laurel", "Malaking Pook", "Mataas na Lupa", "Natunuan North", "Natunuan South", "Padre Castillo", "Palsahingin", "Pila", "Poblacion", "Pook ni Banal", "Pook ni Kapitan", "Resplandor", "Sambat", "San Antonio", "San Mariano", "San Mateo", "Santa Elena", "Santo Niño"
],
                       "Santo Teresita":["Antipolo", "Bihis", "Burol", "Calayaan", "Calumala", "Cuta East", "Cutang Cawayan", "Irukan", "Pacifico", "Poblacion I", "Poblacion II", "Poblacion III", "Saimsim", "Sampa", "Sinipian", "Tambo Ibaba", "Tambo Ilaya"
], 
                     "Santo Tomas":["Barangay I", "Barangay II", "Barangay III", "Barangay IV", "San Agustin", "San Antonio", "San Bartolome", "San Felix", "San Fernando", "San Francisco", "San Isidro Norte", "San Isidro Sur", "San Joaquin", "San Jose", "San Juan", "San Luis", "San Miguel", "San Pablo", "San Pedro", "San Rafael", "San Roque", "San Vicente", "Santa Ana", "Santa Anastacia", "Santa Clara", "Santa Cruz", "Santa Elena", "Santa Maria", "Santa Teresita", "Santiago"
],
                     "Taal":["Apacay", "Balisong", "Bihis", "Bolbok", "Buli", "Butong", "Carasuche", "Cawit", "Caysasay", "Cubamba", "Cultihan", "Gahol", "Halang", "Iba", "Ilog", "Imamawo", "Ipil", "Laguile", "Latag", "Luntal", "Mahabang Lodlod", "Niogan", "Pansol", "Poblacion 1", "Poblacion 10", "Poblacion 11", "Poblacion 12", "Poblacion 13", "Poblacion 14", "Poblacion 2", "Poblacion 3", "Poblacion 4", "Poblacion 5", "Poblacion 6", "Poblacion 7", "Poblacion 8", "Poblacion 9", "Pook", "Seiran", "Tatlong Maria", "Tierra Alta", "Tulo"
], 
                     "Talisay":["Aya", "Balas", "Banga", "Buco", "Caloocan", "Leynes", "Miranda", "Poblacion Barangay 1", "Poblacion Barangay 2", "Poblacion Barangay 3", "Poblacion Barangay 4", "Poblacion Barangay 5", "Poblacion Barangay 6", "Poblacion Barangay 7", "Poblacion Barangay 8", "Quiling", "Sampaloc", "San Guillermo", "Santa Maria", "Tranca", "Tumaway"
],
                      "Tanauan":["Altura Bata", "Altura Matanda", "Altura-South", "Ambulong", "Bagbag", "Bagumbayan", "Balele", "Banadero", "Banjo East", "Banjo Laurel", "Bilog-bilog", "Boot", "Cale", "Darasa", "Gonzales", "Hidalgo", "Janopol", "Janopol Oriental", "Laurel", "Luyos", "Mabini", "Malaking Pulo", "Maria Paz", "Maugat", "Montaña", "Natatas", "Pagaspas", "Pantay Bata", "Pantay Matanda", "Poblacion Barangay 1", "Poblacion Barangay 2", "Poblacion Barangay 3", "Poblacion Barangay 4", "Poblacion Barangay 5", "Poblacion Barangay 6", "Poblacion Barangay 7", "Sala", "Sambat", "San Jose", "Santol", "Santor", "Sulpoc", "Suplang", "Talaga", "Tinurik", "Trapiche", "Ulango", "Wawa"
],
                        "Taysan":["Bacao", "Bilogo", "Bukal", "Dagatan", "Guinhawa", "Laurel", "Mabayabas", "Mahanadiong", "Mapulo", "Mataas na Lupa", "Pag-asa", "Panghayaan", "Pinagbayanan", "Piña", "Poblacion East", "Poblacion West", "San Isidro", "San Marcelino", "Santo Niño", "Tilambo"
],
                        "Tingloy":["Barangay 13", "Barangay 14", "Barangay 15", "Corona", "Gamao", "Makawayan", "Marikaban", "Papaya", "Pisa", "San Isidro", "San Jose", "San Juan", "San Pedro", "Santo Tomas", "Talahib"
],
                       "Tuy":["Acle", "Bayudbud", "Bolboc", "Burgos", "Dalima", "Dao", "Guinhawa", "Lumbangan", "Luna", "Luntal", "Magahis", "Malibu", "Mataywanac", "Palincaro", "Putol", "Rillo", "Rizal", "Sabang", "San Jose", "Talon", "Toong", "Tuyon-tuyon"
]},
            barangays: [  ]
        },"Benguet": {
            cities: {"Atok":["Abiang", "Caliking", "Cattubo", "Naguey", "Paoay", "Pasdong", "Poblacion", "Topdac"
], 
                "Bakun":["Ampusongan", "Bagu", "Dalipey", "Gambang", "Kayapa", "Poblacion", "Sinacbat"
],
                "Bokod":["Ambuclao", "Bila", "Bobok-Bisal", "Daclan", "Ekip", "Karao", "Nawal", "Pito", "Poblacion", "Tikey"
], 
                "Buguias":["Abatan", "Amgaleyguey", "Amlimay", "Baculongan Norte", "Baculongan Sur", "Bangao", "Buyacaoan", "Calamagan", "Catlubong", "Lengaoan", "Loo", "Natubleng", "Poblacion", "Sebang"
], 
                "Itogon":["Ampucao", "Dalupirip", "Gumatdang", "Loacan", "Poblacion", "Tinongdan", "Tuding", "Ucab", "Virac"
], 
                "Kabayan":["Adaoay", "Anchukey", "Ballay", "Bashoy", "Batan", "Duacan", "Eddet", "Gusaran", "Kabayan Barrio", "Lusod", "Pacso", "Poblacion", "Tawangan"
], 
                "Kapangan":["Balakbak", "Beleng-Belis", "Boklaoan", "Cayapes", "Cuba", "Datakan", "Gadang", "Gasweling", "Labueg", "Paykek", "Poblacion Central", "Pongayan", "Pudong", "Sagubo", "Taba-ao"
], 
                "Kibungan":["Badeo", "Lubo", "Madaymen", "Palina", "Poblacion", "Sagpat", "Tacadang"
], 
                     "La Trinidad":["Alapang", "Alno", "Ambiong", "Bahong", "Balili", "Beckel", "Betag", "Bineng", "Cruz", "Lubas", "Pico", "Poblacion", "Puguis", "Shilan", "Tawang", "Wangal"
],
                      "Mankayan":["Balili", "Bedbed", "Bulalacao", "Cabiten", "Colalo", "Guinaoang", "Paco", "Palasaan", "Poblacion", "Sapid", "Tabio", "Taneg"
],
                       "Sablan":["Bagong", "Balluay", "Banangan", "Banengbeng", "Bayabas", "Kamog", "Pappa", "Poblacion"
], 
                       "Tuba":["Ansagan", "Camp 3", "Camp 4", "Camp One", "Nangalisan", "Poblacion", "San Pascual", "Tabaan Norte", "Tabaan Sur", "Tadiangan", "Taloy Norte", "Taloy Sur", "Twin Peaks"
],
                        "Tublay":["Ambassador", "Ambongdolan", "Ba-ayan", "Basil", "Caponga", "Daclan", "Tublay Central", "Tuel"
]},
            barangays: [  ]
        },
        "Biliran": {
            cities: {
                "Almeria":["Caucab", "Iyosan", "Jamorawon", "Lo-ok", "Matanga", "Pili", "Poblacion", "Pulang Bato", "Salangi", "Sampao", "Tabunan", "Talahid", "Tamarindo"
],
                "Biliran":["Bato", "Burabod", "Busali", "Canila", "Hugpa", "Julita", "Pinangumhan", "San Isidro", "San Roque", "Sanggalang", "Villa Enage"
], 
                "Caibiran":["Balaquid", "Baso", "Bunga", "Caanibongan", "Casiawan", "Esperanza", "Langgao", "Libertad", "Looc", "Magbangon", "Pawikan", "Salawad", "Talibong"
],
                 "Culaba":["Acaban", "Bacolod", "Binongtoan", "Bool Central", "Bool East", "Bool West", "Calipayan", "Culaba Central", "Guindapunan", "Habuhab", "Looc", "Marvel", "Patag", "Pinamihagan", "Salvacion", "San Roque", "Virginia"
], 
                 "Kawayan":["Baganito", "Balacson", "Balite", "Bilwang", "Bulalacao", "Burabod", "Buyo", "Inasuyan", "Kansanok", "Mada-o", "Mapuyo", "Masagaosao", "Masagongsong", "Poblacion", "San Lorenzo", "Tabunan North", "Tubig Guinoo", "Tucdao", "Ungale", "Villa Cornejo"
],
                  "Maripipi":["Agutay", "Banlas", "Bato", "Binalayan East", "Binalayan West", "Binongto-an", "Burabod", "Calbani", "Canduhao", "Casibang", "Danao", "Ermita", "Ol-og", "Trabugan", "Viga"
], 
                  "Naval":["Agpangi", "Anislagan", "Atipolo", "Borac", "Cabungaan", "Calumpang", "Capiñahan", "Caraycaray", "Catmon", "Haguikhikan", "Imelda", "Larrazabal", "Libertad", "Libtong", "Lico", "Lucsoon", "Mabini", "Padre Inocentes Garcia", "Padre Sergio Eamiguel", "Sabang", "San Pablo", "Santissimo Rosario Poblacion", "Santo Niño", "Talustusan", "Villa Caneja", "Villa Consuelo"
]},
            barangays: [  ]
        },
        "Bohol": {
            cities: {
                
                "Alburquerque":["Bahi", "Basacdacu", "Cantiguib", "Dangay", "East Poblacion", "Ponong", "San Agustin", "Santa Filomena", "Tagbuane", "Toril", "West Poblacion"
],
                "Alicia":["Cabatang", "Cagongcagong", "Cambaol", "Cayacay", "Del Monte", "Katipunan", "La Hacienda", "Mahayag", "Napo", "Pagahat", "Poblacion", "Progreso", "Putlongcam", "Sudlon", "Untaga"
],
                "Anda":["Almaria", "Bacong", "Badiang", "Buenasuerte", "Candabong", "Casica", "Katipunan", "Linawan", "Lundag", "Poblacion", "Santa Cruz", "Suba", "Talisay", "Tanod", "Tawid", "Virgen"
],
                "Antequera":["Angilan", "Bantolinao", "Bicahan", "Bitaugan", "Bungahan", "Can-omay", "Canlaas", "Cansibuan", "Celing", "Danao", "Danicop", "Mag-aso", "Poblacion", "Quinapon-an", "Santo Rosario", "Tabuan", "Tagubaas", "Tupas", "Ubojan", "Viga", "Villa Aurora"
], 
                "Baclayon":["Buenaventura", "Cambanac", "Dasitam", "Guiwanon", "Landican", "Laya", "Libertad", "Montana", "Pamilacan", "Payahan", "Poblacion", "San Isidro", "San Roque", "San Vicente", "Santa Cruz", "Taguihon", "Tanday"
], 
                "Balilihan":["Baucan Norte", "Baucan Sur", "Boctol", "Boyog Norte", "Boyog Proper", "Boyog Sur", "Cabad", "Candasig", "Cantalid", "Cantomimbo", "Cogon", "Datag Norte", "Datag Sur", "Del Carmen Este", "Del Carmen Norte", "Del Carmen Sur", "Del Carmen Weste", "Del Rosario", "Dorol", "Haguilanan Grande", "Hanopol Este", "Hanopol Norte", "Hanopol Weste", "Magsija", "Maslog", "Sagasa", "Sal-ing", "San Isidro", "San Roque", "Santo Niño", "Tagustusan"
],
                "Batuan":["Aloja", "Behind The Clouds", "Cabacnitan", "Cambacay", "Cantigdas", "Garcia", "Janlud", "Poblacion Norte", "Poblacion Sur", "Poblacion Vieja", "Quezon", "Quirino", "Rizal", "Rosariohan", "Santa Cruz", "Bilangbilangan Dako", "Bilangbilangan Diot"
],
                "Bien Unido":["Hingotanan East", "Hingotanan West", "Liberty", "Malingin", "Mandawa", "Maomawan", "Nueva Esperanza", "Nueva Estrella", "Pinamgo", "Poblacion", "Puerto San Pedro", "Sagasa", "Tuboran"
],
                 "Bilar":["Bonifacio", "Bugang Norte", "Bugang Sur", "Cabacnitan", "Cambigsi", "Campagao", "Cansumbol", "Dagohoy", "Owac", "Poblacion", "Quezon", "Riverside", "Rizal", "Roxas", "Subayon", "Villa Aurora", "Villa Suerte", "Yanaya", "Zamora"
], 
                 "Buenavista":["Anonang", "Asinan", "Bago", "Baluarte", "Bantuan", "Bato", "Bonotbonot", "Bugaong", "Cambuhat", "Cambus-oc", "Cangawa", "Cantomugcad", "Cantores", "Cantuba", "Catigbian", "Cawag", "Cruz", "Dait", "Eastern Cabul-an", "Hunan", "Lapacan Norte", "Lapacan Sur", "Lubang", "Lusong", "Magkaya", "Merryland", "Nueva Granada", "Nueva Montana", "Overland", "Panghagban", "Poblacion", "Puting Bato", "Rufo Hill", "Sweetland", "Western Cabul-an"
],
                  "Calape":["Abucayan Norte", "Abucayan Sur", "Banlasan", "Bentig", "Binogawan", "Bonbon", "Cabayugan", "Cabudburan", "Calunasan", "Camias", "Canguha", "Catmonan", "Desamparados", "Kahayag", "Kinabag-an", "Labuon", "Lawis", "Liboron", "Lo-oc", "Lomboy", "Lucob", "Madangog", "Magtongtong", "Mandaug", "Mantatao", "Sampoangon", "San Isidro", "Santa Cruz", "Sojoton", "Talisay", "Tinibgan", "Tultugan", "Ulbujan"
], 
                    "Candijay":["Abihilan", "Anoling", "Boyo-an", "Cadapdapan", "Cambane", "Can-olin", "Canawa", "Cogtong", "La Union", "Luan", "Lungsoda-an", "Mahangin", "Pagahat", "Panadtaran", "Panas", "Poblacion", "San Isidro", "Tambongan", "Tawid", "Tubod", "Tugas"
],
                     "Catigbian":["Alegria", "Ambuan", "Baang", "Bagtic", "Bongbong", "Cambailan", "Candumayao", "Causwagan Norte", "Hagbuaya", "Haguilanan", "Kang-iras", "Libertad Sur", "Liboron", "Mahayag Norte", "Mahayag Sur", "Maitum", "Mantasida", "Poblacion", "Poblacion Weste", "Rizal", "Sinakayanan", "Triple Union"
],
                      "Carmen":["Alegria", "Bicao", "Buenavista", "Buenos Aires", "Calatrava", "El Progreso", "El Salvador", "Guadalupe", "Katipunan", "La Libertad", "La Paz", "La Salvacion", "La Victoria", "Matin-ao", "Montehermoso", "Montesuerte", "Montesunting", "Montevideo", "Nueva Fuerza", "Nueva Vida Este", "Nueva Vida Norte", "Nueva Vida Sur", "Poblacion Norte", "Poblacion Sur", "Tambo-an", "Vallehermoso", "Villaflor", "Villafuerte", "Villarcayo"
],
                       "Clarin":["Bacani", "Bogtongbod", "Bonbon", "Bontud", "Buacao", "Buangan", "Cabog", "Caboy", "Caluwasan", "Candajec", "Cantoyoc", "Comaang", "Danahao", "Katipunan", "Lajog", "Mataub", "Nahawan", "Poblacion Centro", "Poblacion Norte", "Poblacion Sur", "Tangaran", "Tontunan", "Tubod", "Villaflor"
], 
                    "Corella":["Anislag", "Canangca-an", "Canapnapan", "Cancatac", "Pandol", "Poblacion", "Sambog", "Tanday"
],
                    "Cortes":["De la Paz", "Fatima", "Loreto", "Lourdes", "Malayo Norte", "Malayo Sur", "Monserrat", "New Lourdes", "Patrocinio", "Poblacion", "Rosario", "Salvador", "San Roque", "Upper de la Paz"
],
                    "Dagohoy":["Babag", "Cagawasan", "Cagawitan", "Caluasan", "Can-oling", "Candelaria", "Estaca", "La Esperanza", "Mahayag", "Malitbog", "Poblacion", "San Miguel", "San Vicente", "Santa Cruz", "Villa Aurora"
],
                       "Danao":["Cabatuan", "Cantubod", "Carbon", "Concepcion", "Dagohoy", "Hibale", "Magtangtang", "Nahud", "Poblacion","Remedios", "San Carlos", "San Miguel", "Santa Fe", "Santo Niño", "Tabok", "Taming", "Villa Anunciado"
], 
                        "Dauis":["Biking", "Bingag", "Catarman", "Dao", "Mariveles", "Mayacabac", "Poblacion", "San Isidro", "Songculan", "Tabalong", "Tinago", "Totolan"],
                       "Dimiao":["Abihid, Alemania, Baguhan, Bakilid, Balbalan, Banban, Bauhugan, Bilisan, Cabagakian, Cabanbanan, Cadap-agan, Cambacol, Cambayaon, Canhayupon, Canlambong, Casingan, Catugasan, Datag, Guindaguitan, Guingoyuran, Ile, Lapsaon, Limokon Ilaod, Limokon Ilaya, Luyo, Malijao, Oac, Pagsa, Pangihawan, Puangyuta, Sawang, Tangohay, Taongon Cabatuan, Taongon Can-andam, Tawid Bitaog"],
                        "Duero":["Alejawan", "Angilan", "Anibongan", "Bangwalog", "Cansuhay", "Danao", "Duay", "Guinsularan", "Imelda", "Itum", "Langkis", "Lobogon", "Madua Norte", "Madua Sur", "Mambool", "Mawi", "Payao", "San Antonio", "San Isidro", "San Pedro", "Taytay"], 
                        "Garcia Hernandez":["Abijilan", "Antipolo", "Basiao", "Cagwang", "Calma", "Cambuyo", "Canayaon East", "Canayaon West", "Candanas", "Candulao", "Catmon", "Cayam", "Cupa", "Datag", "Estaca", "Libertad", "Lungsodaan East", "Lungsodaan West", "Malinao", "Manaba", "Pasong", "Poblacion East", "Poblacion West", "Sacaon", "Sampong", "Tabuan", "Togbongon", "Ulbujan East", "Ulbujan West", "Victoria"],
                        "Getafe":["Alumar", "Banacon", "Buyog", "Cabasakan", "Campao Occidental", "Campao Oriental", "Cangmundo", "Carlos P. Garcia", "Corte Baud", "Handumon", "Jagoliao", "Jandayan Norte", "Jandayan Sur", "Mahanay", "Nasingin", "Pandanon", "Poblacion", "Saguise", "Salog", "San Jose", "Santo Niño", "Taytay", "Tugas", "Tulang"],
                        "Guindulman":[ "Basdio", "Bato", "Bayong", "Biabas", "Bulawan", "Cabantian", "Canhaway", "Cansiwang", "Casbu", "Catungawan Norte", "Catungawan Sur", "Guinacot", "Guio-ang", "Lombog", "Mayuga", "Sawang", "Tabajan", "Tabunok", "Trinidad"],
                        "Inabanga":["Anonang", "Badiang", "Baguhan", "Bahan", "Banahao", "Baogo", "Bugang", "Cagawasan", "Cagayan", "Cambitoon", "Canlinte", "Cawayan", "Cogon", "Cuaming", "Dagnawan", "Dagohoy", "Dait Sur", "Datag", "Fatima", "Hambongan", "Ilaud", "Ilaya", "Ilihan", "Lapacan Norte", "Lapacan Sur", "Lawis", "Liloan Norte", "Liloan Sur", "Lomboy", "Lonoy Cainsican", "Lonoy Roma", "Lutao", "Luyo", "Mabuhay", "Maria Rosario", "Nabuad", "Napo", "Ondol", "Poblacion", "Riverside", "Saa", "San Isidro", "San Jose", "Santo Niño", "Santo Rosario", "Sua", "Tambook", "Tungod", "U-og", "Ubujan"],
                        "Jagna":["Alejawan", "Balili", "Boctol", "Bunga Ilaya", "Bunga Mar", "Buyog", "Cabunga-an", "Calabacita", "Cambugason", "Can-ipol", "Can-uba", "Can-upao", "Canjulao", "Cantagay", "Cantuyoc", "Faraon", "Ipil", "Kinagbaan", "Laca", "Larapan", "Lonoy", "Looc", "Malbog", "Mayana", "Naatang", "Nausok", "Odiong", "Pagina", "Pangdan", "Poblacion", "Tejero", "Tubod Mar", "Tubod Monte"],
                        "Lila":[ "Banban", "Bonkokan Ilaya", "Bonkokan Ubos", "Calvario", "Candulang", "Catugasan", "Cayupo", "Cogon", "Jambawan", "La Fortuna", "Lomanoy", "Macalingan", "Malinao East", "Malinao West", "Nagsulay", "Poblacion", "Taug", "Tiguis"],
                        "Loay":["Agape", "Alegria Norte", "Alegria Sur", "Bonbon", "Botoc Occidental", "Botoc Oriental", "Calvario", "Concepcion", "Hinawanan", "Las Salinas Norte", "Las Salinas Sur", "Palo", "Poblacion Ibabao", "Poblacion Ubos", "Sagnap", "Tambangan", "Tangcasan Norte", "Tangcasan Sur", "Tayong Occidental", "Tayong Oriental", "Tocdog Dacu", "Tocdog Ilaya", "Villalimpia", "Yanangan"],
                        "Loboc":[ "Agape", "Alegria", "Bagumbayan", "Bahian", "Bonbon Lower", "Bonbon Upper", "Buenavista", "Bugho", "Cabadiangan", "Calunasan Norte", "Calunasan Sur", "Camayaan", "Cambance", "Candabong", "Candasag", "Canlasid", "Gon-ob", "Gotozon", "Jimilian", "Oy", "Poblacion Ondol", "Poblacion Sawang", "Quinoguitan", "Taytay", "Tigbao", "Ugpong", "Valladolid", "Villaflor"],
                        "Loon":["Agsoso", "Badbad Occidental", "Badbad Oriental", "Bagacay Katipunan", "Bagacay Kawayan", "Bagacay Saong", "Bahi", "Basac", "Basdacu", "Basdio", "Biasong", "Bongco", "Bugho", "Cabacongan", "Cabadug", "Cabug", "Calayugan Norte", "Calayugan Sur", "Cambaquiz", "Campatud", "Candaigan", "Canhangdon Occidental", "Canhangdon Oriental", "Canigaan", "Canmaag", "Canmanoc", "Cansuagwit", "Cansubayon", "Cantam-is Bago", "Cantam-is Baslay", "Cantaongon", "Cantumocad", "Catagbacan Handig", "Catagbacan Norte", "Catagbacan Sur", "Cogon Norte", "Cogon Sur", "Cuasi", "Genomoan", "Lintuan", "Looc", "Mocpoc Norte", "Mocpoc Sur", "Moto Norte", "Moto Sur", "Nagtuang", "Napo", "Nueva Vida", "Panangquilon", "Pantudlan", "Pig-ot", "Pondol", "Quinobcoban", "Sondol", "Song-on", "Talisay", "Tan-awan", "Tangnan", "Taytay", "Ticugan", "Tiwi", "Tontonan", "Tubodacu", "Tubodio", "Tubuan", "Ubayon", "Ubojan"
],
                        "Mabini":["Abaca","Abad Santos", "Aguipo", "Baybayon", "Bulawan", "Cabidian", "Cawayanan", "Concepcion", "Del Mar", "Lungsoda-an", "Marcelo", "Minol", "Paraiso", "Poblacion I", "Poblacion II", "San Isidro", "San Jose", "San Rafael", "San Roque", "Tambo", "Tangkigan", "Valaga"
],
                        "Maribojoc":["Agahay", "Aliguay", "Anislag", "Bayacabac", "Bood", "Busao", "Cabawan", "Candavid", "Dipatlong", "Guiwanon", "Jandig", "Lagtangon", "Lincod", "Pagnitoan", "Poblacion", "Punsod", "Punta Cruz", "San Isidro", "San Roque", "San Vicente", "Tinibgan", "Toril"
],
                        "Panglao":["Bil-isan", "Bolod", "Danao", "Doljo", "Libaong", "Looc", "Lourdes", "Poblacion", "Tangnan", "Tawala"
], 
                     "Pilar":["Aurora", "Bagacay", "Bagumbayan", "Bayong", "Buenasuerte", "Cagawasan", "Cansungay", "Catagda-an", "Del Pilar", "Estaca", "Ilaud", "Inaghuban", "La Suerte", "Lumbay", "Lundag", "Pamacsalan", "Poblacion", "Rizal", "San Carlos", "San Isidro", "San Vicente"
], 
                     "President Carlos P. Garcia":["Aguining", "Basiao", "Baud", "Bayog", "Bogo", "Bonbonon", "Butan", "Campamanog", "Canmangao", "Gaus", "Kabangkalan", "Lapinig", "Lipata", "Poblacion", "Popoo", "Saguise", "San Jose", "San Vicente", "Santo Rosario", "Tilmobo", "Tugas", "Tugnao", "Villa Milagrosa"
], 
                     "Sagbayan":["Calangahan", "Canmano", "Canmaya Centro", "Canmaya Diot", "Dagnawan", "Kabasacan", "Kagawasan", "Katipunan", "Langtad", "Libertad Norte", "Libertad Sur", "Mantalongon", "Poblacion", "Sagbayan Sur", "San Agustin", "San Antonio", "San Isidro", "San Ramon", "San Roque", "San Vicente Norte", "San Vicente Sur", "Santa Catalina", "Santa Cruz", "Ubojan"
], 
                     "San Isidro":["Abehilan", "Baryong Daan", "Baunos", "Cabanugan", "Caimbang", "Cambansag", "Candungao", "Cansague Norte", "Cansague Sur", "Causwagan Sur", "Masonoy", "Poblacion"
], 
                    "San Miguel":["Bayongan", "Bugang", "Cabangahan", "Caluasan", "Camanaga", "Cambangay Norte", "Capayas", "Corazon", "Garcia", "Hagbuyo", "Kagawasan", "Mahayag", "Poblacion", "San Isidro", "San Jose", "San Vicente", "Santo Niño", "Tomoc"
],
                     "Sevilla":["Bayawahan", "Cabancalan", "Calinga-an", "Calinginan Norte", "Calinginan Sur", "Cambagui", "Ewon", "Guinob-an", "Lagtangan", "Licolico", "Lobgob", "Magsaysay", "Poblacion"
],                      
                    "Sierra Bullones":["Abachanan", "Anibongan", "Bugsoc", "Cahayag", "Canlangit", "Canta-ub", "Casilay", "Danicop", "Dusita", "La Union", "Lataban", "Magsaysay", "Man-od", "Matin-ao", "Poblacion", "Salvador", "San Agustin", "San Isidro", "San Jose", "San Juan", "Santa Cruz", "Villa Garcia"
],
                        "Sikatuna":["Abucay Norte", "Abucay Sur", "Badiang", "Bahaybahay", "Cambuac Norte", "Cambuac Sur", "Canagong", "Libjo", "Poblacion I", "Poblacion II"
],
                      "Tagbilaran":["Bool", "Booy", "Cabawan", "Cogon", "Dampas", "Dao", "Manga", "Mansasa", "Poblacion I", "Poblacion II", "Poblacion III", "San Isidro", "Taloto", "Tiptip", "Ubujan"
],  
                        "Talibon":["Bagacay", "Balintawak", "Burgos", "Busalian", "Calituban", "Cataban", "Guindacpan", "Magsaysay", "Mahanay", "Nocnocan", "Poblacion", "Rizal", "Sag", "San Agustin", "San Carlos", "San Francisco", "San Isidro", "San Jose", "San Pedro", "San Roque", "Santo Niño", "Sikatuna", "Suba", "Tanghaligue", "Zamora"
],
                    "Trinidad":["Banlasan", "Bongbong", "Catoogan", "Guinobatan", "Hinlayagan Ilaud", "Hinlayagan Ilaya", "Kauswagan", "Kinan-oan", "La Union", "La Victoria", "Mabuhay Cabigohan", "Mahagbu", "Manuel M. Roxas", "Poblacion", "San Isidro", "San Vicente", "Santo Tomas", "Soom", "Tagum Norte", "Tagum Sur"
],
                    "Tubigon":["Bagongbanwa", "Banlasan", "Batasan", "Bilangbilangan", "Bosongon", "Buenos Aires", "Bunacan", "Cabulihan", "Cahayag", "Cawayanan", "Centro", "Genonocan", "Guiwanon", "Ilihan Norte", "Ilihan Sur", "Libertad", "Macaas", "Matabao", "Mocaboc Island", "Panadtaran", "Panaytayon", "Pandan", "Pangapasan", "Pinayagan Norte", "Pinayagan Sur", "Pooc Occidental", "Pooc Oriental", "Potohan", "Talenceras", "Tan-awan", "Tinangnan", "Ubay Island", "Ubojan", "Villanueva"
],
                    "Ubay":["Achila", "Bay-ang", "Benliw", "Biabas", "Bongbong", "Bood", "Buenavista", "Bulilis", "Cagting", "Calanggaman", "California", "Camali-an", "Camambugan", "Casate", "Cuya", "Fatima", "Gabi", "Governor Boyles", "Guintabo-an", "Hambabauran", "Humayhumay", "Ilihan", "Imelda", "Juagdan", "Katarungan", "Lomangog", "Los Angeles", "Pag-asa", "Pangpang", "Poblacion", "San Francisco", "San Isidro", "San Pascual", "San Vicente", "Sentinila", "Sinandigan", "Tapal", "Tapon", "Tintinan", "Tipolo", "Tubog", "Tuboran", "Union", "Villa Teresita"
],
                    "Valencia":["Adlawan", "Anas", "Anonang", "Anoyon", "Balingasao", "Banderahan", "Botong", "Buyog", "Canduao Occidental", "Canduao Oriental", "Canlusong", "Canmanico", "Cansibao", "Catug-a", "Cutcutan", "Danao", "Genoveva", "Ginopolan", "La Victoria", "Lantang", "Limocon", "Loctob", "Magsaysay", "Marawis", "Maubo", "Nailo", "Omjon", "Pangi-an", "Poblacion Occidental", "Poblacion Oriental", "Simang", "Taug", "Tausion", "Taytay", "Ticum"
]
},
            barangays: [  ]
        },"Bukidnon": {
            cities: {"Balingoan":[], "Baungon":[], "Cabanglasan":[], "Damulog":[], "Dangcagan":[], "Don Carlos":[], "Impasug-ong":[], "Kadingilan":[], 
                    "Kalilangan":[], "Kibawe":[], "Kitaotao":[], "Lantapan":[], "Libona":[], "Malitbog":[], "Manolo Fortich":[], "Maramag":[], "Pangantucan":[], 
                 "Quezon":[], "San Fernando":[], "Sumilao":[], "Talakag":[], "Valencia":[]},
            barangays: []
        },
        "Bulacan": {
            cities: {"Angat":[], "Balagtas":[], "Baliuag":[], "Bocaue":[], "Bulakan":[], "Bustos":[], "Calumpit":[], "Guiguinto":[], "Hagonoy":[], 
                "Malolos":[], "Marilao":[], "Meycauayan":[], "Norzagaray":[], "Obando":[], "Pandi":[], "Paombong":[], "Plaridel":[], "Pulilan":[], 
                "San Ildefonso":[], "San Jose del Monte":[], "San Miguel":[], "San Rafael":[], "Santa Maria":[]},
            barangays: [  ]
        },
        "Cagayan": {
            cities: {"Abulug":[], "Alcala":[], "Aparri":[], "Baggao":[], "Ballesteros":[], "Buguey":[], "Camalaniugan":[], "Claveria":[], "Enrile":[], 
                "Gattaran":[], "Gonzaga":[], "Iguig":[], "Lasam":[], "Lal-lo":[], "Pamplona":[], "Peñablanca":[], "Piat":[], "Rizal":[], "Santa Ana":[], 
                "Santa Teresita":[], "Solana":[], "Tuao":[]},
            barangays: [  ]
        },"Camarines Norte": {
            cities: {"Basud":[], "Capalonga":[], "Daet":[], "Jose Panganiban":[], "Labo":[], "Mercedes":[], "Paracale":[], "San Lorenzo Ruiz":[], 
                        "San Vicente":[], "Talisay":[], "Vinzons":[]},
            barangays: [  ]
        },
        "Camarines Sur": {
            cities: {"Baao":[], "Bato":[], "Bombon":[], "Buhi":[], "Bula":[], "Cabusao":[], "Camarines Sur":[], "Caramoan":[], "Del Gallego":[], 
                      "Gainza":[], "Iriga":[], "Lagonoy":[], "Libmanan":[], "Lupi":[], "Magarao":[], "Milaor":[], "Minyoro":[], "Nabua":[], "Naga":[], 
                      "Ocampo":[], "Pili":[], "Ragay":[], "Sagnay":[], "Siruma":[], "Tigaon":[], "Tigbinan":[], "Vinzons":[], "Zaragoza":[]},
            barangays: [  ]
        },
        "Camiguin": {
            cities: {"Agoho":[], "Balbagon":[], "Mambajao":[], "Mahinog":[], "Santo Niño":[], "Tupsan":[]},
            barangays: [  ]
        },"Capiz": {
            cities: {"Roxas City":[], "Ivisan":[], "Jamindan":[], "Maayon":[], "Mambusao":[], "Panay":[], "President Roxas":[], "Pilar":[], "Pontevedra":[], 
              "Roxas City":[], "Sapian":[], "Sigma":[], "Tapaz":[]},
            barangays: [  ]
        },
        "Catanduanes": {
            cities: {"Bagamanoc":[], "Baras":[], "Caramoran":[], "Chinco":[], "San Andres":[], "San Miguel":[], "Virac":[]},
            barangays: [  ]
        },
        "Cavite": {
            cities: {"Alfonso":[], "Amadeo":[], "Bacoor":[], "Carmona":[], "Cavite City":[], "Dasmariñas":[], "Gen. Emilio Aguinaldo":[], "Imus":[], 
               "Indang":[], "Kawit":[], "Magallanes":[], "Maragondon":[], "Mendez":[], "Naic":[], "Noveleta":[], "Rosario":[], "Silang":[], "Tagaytay":[], 
               "Tanza":[], "Ternate":[], "Trece Martires":[]},
            barangays: [  ]
        },"Cebu": {
            cities: {"Alcantara":[], "Aloguinsan":[], "Argao":[], "Asturias":[], "Badian":[], "Balamban":[], "Bantayan":[], "Barili":[], "Bogo":[], "Boljoon":[], 
             "Carcar":[], "Cebu City":[], "Consolacion":[], "Cordova":[], "Daanbantayan":[], "Dalaguete":[], "Dumanjug":[], "Ginatilan":[], 
             "Lapu-Lapu":[], "Liloan":[], "Madridejos":[], "Malabuyoc":[], "Mandaue":[], "Medellin":[], "Minglanilla":[], "Moalboal":[], "Naga":[], 
             "Oslob":[], "Poro":[], "Ronda":[], "Samboan":[], "San Fernando":[], "San Remigio":[], "Santander":[], "Sogod":[], "Tabogon":[], "Tabuelan":[], 
             "Talisay":[], "Toledo":[], "Tuburan":[], "Carcar":[], "City of Bogo":[], "Municipality of Sogod":[]},
            barangays: [  ]
        },
        "Cotabato": {
            cities: {"Alamada":[], "Aleosan":[], "Antipas":[], "Arakan":[], "Banisilan":[], "Carmen":[], "Kabacan":[], "Midsayap":[], "Mlang":[], "Pikit":[], 
                 "Pigcawayan":[], "President Roxas":[], "Rizal":[], "Shariff Aguak":[], "Tacurong":[], "Tulunan":[]},
            barangays: [  ]
        },
        "Davao de Oro": {
            cities: {"Maco":[], "Maragusan":[], "Mawab":[], "Monkayo":[], "Nabunturan":[], "Pantukan":[]},
            barangays: [  ]
        },"Davao del Norte": {
            cities: {"Asuncion":[], "Braulio E. Dujali":[], "Carmen":[], "Kapalong":[], "Panabo":[], "San Isidro":[], "Santo Tomas":[], 
                        "Tagum":[], "Talaingod":[]},
            barangays: [  ]
        },
        "Davao del Sur": {
            cities: {"Davao City":[], "Bansalan":[], "Digos":[], "Hagonoy":[], "Kiblawan":[], "Magsaysay":[], "Malalag":[], "Santa Cruz":[], 
                      "Sulop":[], "Matanao":[]},
            barangays: [  ]
        },
        "Davao Occidental": {
            cities: {"Malita":[], "Don Marcelino":[], "Jose Abad Santos":[], "Sarap":[], "Santo Niño":[], "Sition":[], "Samal":[], "Tupi":[]},
            barangays: [  ]
        },"Davao Oriental": {
            cities: {"Banay-Banay":[], "Baganga":[], "Boston":[], "Cateel":[], "Mati":[], "San Isidro":[], "San Vicente":[], "Tarragona":[], "Baganga":[]},
            barangays: [  ]
        },
        "Dinagat Islands": {
            cities: {"Basilisa":[], "Cagdianao":[], "Dinagat":[], "Libjo":[], "Loreto":[], "San Jose":[], "San Juan":[], "Tubajon":[]},
            barangays: [  ]
        },
        "Eastern Samar": {
            cities: {"Borongan":[], "Can-avid":[], "Dolores":[], "Guiuan":[], "Hernani":[], "Lawaan":[], "Llorente":[], "Maslog":[], "Maydolong":[], 
                      "Mercedes":[], "Oras":[], "Quinapondan":[], "Salcedo":[], "San Julian":[], "San Policarpo":[], "Sulat":[], "Taft":[]},
            barangays: [  ]
        },"Guimaras": {
            cities: {"Buenavista":[], "Jordan":[], "Nueva Valencia":[], "San Lorenzo":[], "Sibunag":[]},
            barangays: [  ]
        },
        "Ifugao": {
            cities: {"Alfonso Lista":[], "Asipulo":[], "Aurora":[], "Echague":[], "Hingyon":[], "Hungduan":[], "Natonin":[], "Pudtol":[], "Quezon":[], "Mayoyao":[], 
               "Natonin":[], "Lamut":[]},
            barangays: [  ]
        },
        "Ilocos Norte": {
            cities: {"Badoc":[], "Bangui":[], "Banna":[], "Currimao":[], "Dingras":[], "Laoag":[], "Luna":[], "Pasuquin":[], "Piddig":[], "Pinili":[], 
                     "Sarrat":[], "Solsona":[], "Vintar":[]},
            barangays: [  ]
        },"Ilocos Sur": {
            cities: {"Candon":[], "Caoayan":[], "Galimuyod":[], "Lidlidda":[], "Magsingal":[], "Narvacan":[], "Quirino":[], "Salcedo":[], "Santa":[], 
                   "Santa Maria":[], "Sinait":[], "Vigan":[]},
            barangays: [  ]
        },
        "Iloilo": {
            cities: {"Ajuy":[], "Alimodian":[], "Anilao":[], "Badiangan":[], "Balasan":[], "Banate":[], "Barotac Nuevo":[], "Barotac Viejo":[], "Bingawan":[], 
               "Cabatuan":[], "Calinog":[], "Carles":[], "Concepcion":[], "Dingle":[], "Dueñas":[], "Dumangas":[], "Iloilo City":[], "Leganes":[], 
               "Lemery":[], "Leon":[], "Miagao":[], "Mina":[], "New Lucena":[], "Oton":[], "Passi":[], "Pavia":[], "San Dionisio":[], "San Enrique":[], 
               "San Joaquin":[], "San Miguel":[], "Santa Barbara":[], "Sara":[], "Zarraga":[]},
            barangays: [  ]
        },
        "Isabela": {
            cities: {"Angadanan":[], "Alicia":[], "Aurora":[], "Benito Soliven":[], "Burgos":[], "Cabagan":[], "Cauayan":[], "Cordon":[], "Ilagan":[], 
                "Jones":[], "Luna":[], "Maconacon":[], "Mallig":[], "San Agustin":[], "San Guillermo":[], "San Isidro":[], "San Mariano":[], 
                "San Mateo":[], "Santa Maria":[], "Santiago":[], "Tumauini":[]},
            barangays: [  ]
        },"Kalinga": {
            cities: {"Balbalan":[], "Conner":[], "Dulag":[], "Lubuagan":[], "Pasil":[], "Pinukpuk":[], "Rizal":[], "Tabuk":[], "Tanudan":[], "Tinglayan":[]},
            barangays: [  ]
        },
        "La Union": {
            cities: {"Agoo":[], "Aringay":[], "Bacnotan":[], "Bagulin":[], "Bauang":[], "Burgos":[], "Caba":[], "Luna":[], "Naguilian":[], "Pugo":[], "San Fernando":[], 
                 "San Gabriel":[], "San Juan":[], "San Luis":[], "San Marcos":[], "San Nicolas":[], "Santol":[], "Santo Tomas":[], "Tubao":[]},
            barangays: [  ]
        },
        "Laguna": {
            cities: {"Alaminos":[], "Bay":[], "Biñan":[], "Cabuyao":[], "Calamba":[], "Calauan":[], "Carmona":[], "Ciudad de San Pedro":[], "Famy":[], 
               "Kalayaan":[], "Liliw":[], "Los Baños":[], "Luisiana":[], "Magdalena":[], "Majayjay":[], "Nagcarlan":[], "Pagsanjan":[], 
               "Pakil":[], "Pangil":[], "Pila":[], "Rizal":[], "San Pablo":[], "San Pedro":[], "Santa Cruz":[], "Santa Maria":[], "Siniloan":[], 
               "Victoria":[]},
            barangays: [  ]
        },"Lanao del Norte": {
            cities: {"Bacolod":[], "Baloi":[], "Baroy":[], "Kapatagan":[], "Kauswagan":[], "Kolambugan":[], "Linamon":[], "Magsaysay":[], 
                        "Maigo":[], "Manticao":[], "Marogong":[], "Midsalip":[], "Tubod":[]},
            barangays: [  ]
        },
        "Lanao del Sur": {
            cities: {"Balindong":[], "Bumbaran":[], "Ganassi":[], "Kapai":[], "Kapatagan":[], "Lumbayanague":[], "Madalum":[], "Madamba":[], 
                      "Maguing":[], "Marantao":[], "Marawi":[], "Masiu":[], "Mulondo":[], "Piagapo":[], "Pualas":[], "Saguiaran":[], "Tamparan":[], 
                      "Tubaran":[], "Tugaya":[]},
            barangays: [  ]
        },
        "Leyte": {
            cities: {"Abuyog":[], "Alangalang":[], "Albuera":[], "Babatngon":[], "Barugo":[], "Bato":[], "Burauen":[], "Calubian":[], "Capoocan":[], 
              "Carigara":[], "Dagami":[], "Dulag":[], "Hilongos":[], "Inopacan":[], "Jaro":[], "Jumangit":[], "La Paz":[], "Lapinig":[], "Lezo":[], 
              "Libagon":[], "Liloan":[], "Ormoc":[], "Palo":[], "Palompon":[], "Pastrana":[], "San Isidro":[], "San Miguel":[], "San Roque":[], 
              "San Sebastian":[], "Santa Fe":[], "Samar":[], "Tanauan":[], "Tolosa":[]},
            barangays: [  ]
        },"Maguindanao del Norte": {
            cities: {"Datu Anggal Midtimbang":[], "Datu Odin Sinsuat":[], "Datu Piang":[], "Datu Salibo":[], "Kabuntalan":[], 
                              "Kapatagan":[], "Matanog":[], "Midsayap":[], "Shariff Aguak":[], "Sultan Kudarat":[], "Sultan Mastura":[]},
            barangays: [  ]
        },
        "Maguindanao del Sur": {
            cities: {"Buluan":[], "Datu Blah Sinsuat":[], "Datu Hoffer":[], "Datu Montawal":[], "Datu Saudi-Ampatuan":[], 
                            "Datu Salibo":[], "Sultan Kudarat":[], "Sultan Mastura":[], "Tupi":[]},
            barangays: [  ]
        },
        "Marinduque": {
            cities:  {"Boac":[], "Buenavista":[], "Gasan":[], "Mogpog":[], "Santa Cruz":[], "Torrijos":[]},
            barangays: [  ]
        },"Masbate": {
            cities: {"Aroroy":[], "Baleno":[], "Balud":[], "Batuan":[], "Cataingan":[], "Cawayan":[], "Dimasalang":[], "Esperanza":[], "Masbate City":[], 
                "Mobo":[], "Monreal":[], "Palanas":[], "Pio V. Corpus":[], "Placer":[], "San Fernando":[], "San Jacinto":[], "San Pascual":[], 
                "Uson":[]},

            barangays: [  ]
        },
        "Misamis Occidental": {
            cities: {"Aloran":[], "Baliangao":[], "Bonifacio":[], "Clarin":[], "Concepcion":[], "Don Victoriano Chiongbian":[], 
                "Jimenez":[], "Oroquieta":[], "Ozamiz":[], "Panaon":[], "Plaridel":[], "Sapang Dalaga":[], "Sinacaban":[], 
                "Tangub":[], "Tangub City":[]},

            barangays: [  ]
        },
        "Misamis Oriental": {
            cities: {"Alubijid":[], "Balingasag":[], "Balingoan":[], "Binuangan":[], "Cagayan de Oro":[], "Claveria":[], "El Salvador":[], 
                "Gingoog":[], "Initao":[], "Jasaan":[], "Lagonglong":[], "Laguindingan":[], "Libona":[], "Manticao":[], "Medina":[], 
                "Naawan":[], "Opol":[], "Salay":[], "Sugbongcogon":[], "Tagoloan":[], "Villanueva":[]},

            barangays: [  ]
        },"Mountain Province": {
            cities: {"Bauang":[], "Bontoc":[], "Natonin":[], "Paracelis":[], "Sabangan":[], "Sadanga":[], "Sagada":[], "Tadian":[]},

            barangays: [  ]
        },
        "Negros Occidental": {
            cities:{"Bacolod City":[], "Bago":[], "Binalbagan":[], "Cadiz":[], "Calatrava":[], "Cauayan":[], "Enrique B. Magalona":[], 
                "Himamaylan":[], "Hinigaran":[], "Hinoba-an":[], "Ilog":[], "Isabela":[], "Kabankalan":[], "La Carlota":[], 
                "La Castellana":[], "Manapla":[], "Moises Padilla":[], "Murcia":[], "Pontevedra":[], "Pulupandan":[], "San Carlos":[], 
                "San Enrique":[], "Silay":[], "Talisay":[], "Victorias":[]},

            barangays: [  ]
        },
        "Negros Oriental": {
            cities: {"Alicia":[], "Bayawan":[], "Bais":[], "Canlaon":[], "Dauin":[], "Dumaguete":[], "Guihulngan":[], "Jimalalud":[], 
                "La Libertad":[], "Mabinay":[], "Manjuyod":[], "Pamplona":[], "San Jose":[], "San Miguel":[], "Sibulan":[], 
                "Tanjay":[], "Valencia":[], "Zamboanguita":[]},

            barangays: [  ]
        },"Northern Samar": {
            cities: {"Allen":[], "Biri":[], "Bobon":[], "Capul":[], "Catarman":[], "Catubig":[], "Gamay":[], "Lavezares":[], "Lope de Vega":[], 
                "San Antonio":[], "San Isidro":[], "San Jose":[], "San Vicente":[], "Silvino Lobos":[], "Victoria":[]},

            barangays: [  ]
        },
        "Nueva Ecija": {
            cities: {"Aliaga":[], "Cabanatuan":[], "Cabiao":[], "City of Gapan":[], "Guimba":[], "Jaen":[], "Laur":[], "Licab":[], "Lingig":[], "Muñoz":[], 
                "Palayan":[], "Pantabangan":[], "Peñaranda":[], "San Antonio":[], "San Isidro":[], "San Jose":[], "San Leonardo":[], 
                "San Miguel":[], "San Ricardo":[], "Santa Rosa":[], "Santa Fe":[], "Santo Domingo":[], "Talavera":[], "Talugtug":[], 
                "Zaragoza":[]},

            barangays: [  ]
        },
        "Nueva Vizcaya": {
            cities: {"Ambaguio":[], "Aritao":[], "Bagabag":[], "Bambang":[], "Bayombong":[], "Dupax del Norte":[], "Dupax del Sur":[], 
                "Kasibu":[], "Quezon":[], "Solano":[], "Villaverde":[]},


            barangays: [  ]
        },"Occidental Mindoro": {
            cities: {"Abra de Ilog":[], "Calintaan":[], "Magsaysay":[], "Mamburao":[], "Paluan":[], "Rizal":[], "Sablayan":[], "San Jose":[], 
                "San Vicente":[]},

            barangays: [  ]
        },
        "Oriental Mindoro": {
            cities:  {"Baco":[], "Bansud":[], "Bongabong":[], "Calapan":[], "Gloria":[], "Mansalay":[], "Naujan":[], "Pinamalayan":[], 
                "Pola":[], "Puntal":[], "Roxas":[], "San Teodoro":[], "Victoria":[]},

            barangays: [  ]
        },
        "Palawan": {
            cities: {"Aborlan":[], "Agutaya":[], "Araceli":[], "Balabac":[], "Bataraza":[], "Brooke's Point":[], "Cagayancillo":[], "Coron":[], 
                "Culion":[], "Dimaraya":[], "El Nido":[], "Linapacan":[], "Mangsee":[], "Puerto Princesa City":[], "Roxas":[], 
                "San Vicente":[], "Taytay":[], "Balabac":[], "Cuyo":[]},

            barangays: [  ]
        },"Pampanga": {
            cities: {"Angeles City":[], "Apalit":[], "Arayat":[], "Bacolor":[], "Candaba":[], "Floridablanca":[], "Guagua":[], "Lubao":[], "Macabebe":[], 
                "Magalang":[], "Masantol":[], "Mexico":[], "Minalin":[], "Porac":[], "San Fernando":[], "San Luis":[], "San Simon":[], 
                "Sasmuan":[], "Santa Rita":[], "Santa Ana":[]},

            barangays: [  ]
        },
        "Pangasinan": {
            cities: {"Alaminos":[], "Bani":[], "Basista":[], "Bautista":[], "Bayambang":[], "Binalonan":[], "Bolinao":[], "Bugallon":[], "Dagupan":[], 
                "Dasol":[], "Infanta":[], "Labrador":[], "Lingayen":[], "Mangaldan":[], "Mangatarem":[], "Mapandan":[], "Natividad":[], 
                "Rosales":[], "San Carlos":[], "San Fabian":[], "San Jacinto":[], "San Manuel":[], "San Nicolas":[], "San Pascual":[], 
                "Santa Barbara":[], "Santa Maria":[], "Sison":[], "Umingan":[], "Urdaneta":[], "Villasis":[]},

            barangays: [  ]
        },
        "Quezon": {
            cities: {"Alabat":[], "Atimonan":[], "Baler":[], "Candelaria":[], "Catanauan":[], "Dolores":[], "General Nakar":[], "Guinayangan":[], 
                "Gumaca":[], "Infanta":[], "Jomalig":[], "Lopez":[], "Lucban":[], "Lucena":[], "Macalelon":[], "Mauban":[], "Mulanay":[], "Padre Burgos":[], 
                "Pagbilao":[], "Pitogo":[], "Plaridel":[], "Quezon":[], "Real":[], "Sampaloc":[], "San Andres":[], "San Antonio":[], "San Francisco":[], 
                "San Narciso":[], "Sariaya":[], "Tagkawayan":[], "Tiaong":[], "Unisan":[]},
 
            barangays: [  ]
        },"Quirino": {
            cities: {"Aglipay":[], "Cabarroguis":[], "Diffun":[], "Maddela":[], "Saguday":[], "Nagtipunan":[]},

            barangays: [  ]
        },
        "Rizal": {
            cities: {"Angono":[], "Baras":[], "Binangonan":[], "Cainta":[], "Cardona":[], "Jala-Jala":[], "Morong":[], "Pililla":[], "Rodriguez":[], 
                "San Mateo":[], "Tanay":[], "Taytay":[], "Tigbao":[]},
      
  
            barangays: [  ]
        },
        "Romblon": {
            cities:{"Alcantara":[], "Banton":[], "Concepcion":[], "Corcuera":[], "Ferrol":[], "Looc":[], "Odiongan":[], "Romblon":[], "San Agustin":[], 
                "San Andres":[], "San Fernando":[], "San Jose":[], "Santa Fe":[], "Santa Maria":[], "Santo Niño":[], "Tablas":[]},

            barangays: [  ]
        },"Samar": {
            cities: {"Calbiga":[], "Catbalogan":[], "Gandara":[], "Jiabong":[], "Matuguinao":[], "Motiong":[], "Pagsanghan":[], "San Jose de Buan":[], 
                "San Sebastian":[], "Santo Niño":[], "Villareal":[]},
  
            barangays: [  ]
        },
        "Sarangani": {
            cities :{"Alabel":[], "Glan":[], "Malapatan":[], "Maasim":[], "Maitum":[], "Malungon":[]},

            barangays: [  ]
        },
        "Siquijor": {
            cities :{"Larena":[], "Lazi":[], "Maria":[], "San Juan":[], "Siquijor":[], "Santo Niño":[]},
            barangays: [  ]
        },"Sorsogon": {
            cities:  {"Barcelona":[], "Bulan":[], "Casiguran":[], "Donsol":[], "Gubat":[], "Irosin":[], "Juban":[], "Magallanes":[], "Matnog":[], 
                "Pto. de San Juan":[], "Sorsogon City":[], "Sorsogon":[], "Sta. Magdalena":[]},
            barangays: [  ]
        },
        "South Cotabato": {
            cities :{"Alabel":[], "Banga":[], "Glan":[], "Koronadal":[], "Lake Sebu":[], "Norala":[], "Polomolok":[], "Santa Cruz":[], 
                "T'boli":[], "Tupi":[], "Surallah":[]},
            barangays: [  ]
        },
        "Southern Leyte": {
            cities :{"Bontoc":[], "Hinunangan":[], "Hinundayan":[], "Libagon":[], "Liloan":[], "Maasin":[], "Macrohon":[], "Malitbog":[], "Pintuyan":[], 
                "San Juan":[], "San Ricardo":[], "Sogod":[], "Tomas Oppus":[]}, 

            barangays: [  ]
        },"Sultan Kudarat": {
            cities: {"Bagumbayan":[], "Columbio":[], "Esperanza":[], "Isulan":[], "Kalamansig":[], "Lambayong":[], "Lutayan":[], "Sen. Ninoy Aquino":[], 
                "Tacurong":[], "Tampakan":[]},

            barangays: [  ]
        },
        "Sulu": {
            cities :{"Jolo":[], "Patikul":[], "Hickling":[], "Parang":[], "Talipao":[], "Indanan":[], "Maimbung":[], "Luuk":[], "Panglima Estino":[], "Siasi":[]},
    
            barangays: [  ]
        },
        "Surigao del Norte": {
            cities :{"Bacuag":[], "Burgos":[], "Claver":[], "Dapa":[], "Del Carmen":[], "Gigaquit":[], "Mainit":[], "Malimono":[], "Masiu":[], "Placer":[], 
                "Sison":[], "Sugbongcogon":[], "Surigao City":[]},

            barangays: [  ]
        },"Surigao del Sur": {
            cities :{"Barobo":[], "Bayabas":[], "Bislig":[], "Cagwait":[], "Carmen":[], "Cantilan":[], "Carrascal":[], "Lanuza":[], "Lianga":[], 
                "Marihatag":[], "San Agustin":[], "San Juan":[], "San Miguel":[], "Surigao":[], "Tandag":[]},

            barangays: [  ]
        },
        "Tarlac": {
            cities :{"Anao":[], "Bamban":[], "Capas":[], "Concepcion":[], "Gerona":[], "La Paz":[], "Mayantoc":[], "Moncada":[], "Paniqui":[], "Pura":[], 
                "San Clemente":[], "San Jose":[], "San Manuel":[], "San Miguel":[], "San Vicente":[], "Tarlac City":[]},
 
            barangays: [  ]
        },
        "Tawi-Tawi": {
            cities :{"Bongao":[], "Mapun":[], "Sapa-Sapa":[], "Panglima Sugala":[], "Sibutu":[], "Simunul":[], "Sitangkai":[], "Tabuan-Lasa":[]},

            barangays: [  ]
        },"Zambales": {
            cities :{"Botolan":[], "Cabangan":[], "Candelaria":[], "Castillejos":[], "Iba":[], "Masinloc":[], "Olongapo":[], "Palauig":[], "San Antonio":[], 
                "San Felipe":[], "San Marcelino":[], "San Narciso":[], "Subic":[], "Zambales":[]},

            barangays: [  ]
        },
        "Zamboanga del Norte": {
            cities : {"Dapitan City":[], "Dipolog":[], "La Libertad":[], "Manukan":[], "Polanco":[], "Roxas":[], "Sibuco":[], "Sibuco":[], 
                "Sindangan":[], "Tampilisan":[], "Tigbao":[], "Siayan":[]},

            barangays: [  ]
        },
        "Zamboanga del Sur": {
            cities :{"Lakewood":[], "Mahayag":[], "Molave":[], "Pagadian":[], "San Miguel":[], "San Pablo":[], "Sominot":[], "Tambulig":[], 
                "Tigbao":[], "Zamboanga City":[]},

            barangays: [  ]
        },"Zamboanga Sibugay": {
            cities :{"Imelda":[], "Kabasalan":[], "Mabuhay":[], "Malangas":[], "Naga":[], "Olutanga":[], "Rosario":[], "Siay":[], "Talusan":[], 
                "Titay":[], "Zamboanga City":[]},
            barangays: [  ]
        }
    };

    provinceSelect.innerHTML = '<option value="">Choose a province</option>';
    Object.keys(locationData).forEach(province => {
        const option = document.createElement("option");
        option.value = province;
        option.textContent = province;
        provinceSelect.appendChild(option);
    });

    provinceSelect.addEventListener("change", () => {
        const selectedProvince = provinceSelect.value;

        citySelect.innerHTML = '<option value="">Choose a city</option>';
        barangaySelect.innerHTML = '<option value="">Choose a barangay</option>';
        citySelect.disabled = true;
        barangaySelect.disabled = true;
        purokInput.disabled = true;
        zipcodeInput.value = '';

        if (!selectedProvince) return;

        Object.keys(locationData[selectedProvince].cities).forEach(city => {
            const option = document.createElement("option");
            option.value = city;
            option.textContent = city;
            citySelect.appendChild(option);
        });

        citySelect.disabled = false;
    });

    // When City changes
    citySelect.addEventListener("change", () => {
        const selectedProvince = provinceSelect.value;
        const selectedCity = citySelect.value;

        barangaySelect.innerHTML = '<option value="">Choose a barangay</option>';
        barangaySelect.disabled = true;
        purokInput.disabled = true;
        zipcodeInput.value = '';

        if (!selectedCity) return;

        const barangays = locationData[selectedProvince].cities[selectedCity] || [];
        barangays.forEach(barangay => {
            const option = document.createElement("option");
            option.value = barangay;
            option.textContent = barangay;
            barangaySelect.appendChild(option);
        });

        barangaySelect.disabled = false;
        purokInput.disabled = false;
    });
}