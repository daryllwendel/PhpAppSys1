function toggleMenu() {
    const menu = document.querySelector(".menu");
    menu.classList.toggle("active");
    const nav = document.querySelector(".nav");
    nav.classList.toggle("expanded");
}

new Swiper('.card-wrapper', {
    loop: true,
    spaceBetween: 30,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },

    // Navigation arrows
    navigation: {
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

document.addEventListener("DOMContentLoaded", () => {
    const addbutton = document.querySelector(".material-symbols-outlined")
    const bg = document.querySelector(".main-container");
    const cart = document.querySelector(".addtocart");
    const reject = document.querySelector(".buttoncart button");
    const overlay = document.querySelector(".overlay");
    const confirm = document.querySelector(".confirm");
    const reject1 = document.querySelector(".view button");
    const accept = document.querySelector(".accept");

    accept.addEventListener("click", function () {
        overlay.style.display = "none";
        bg.style.filter="blur(0)";
    })

    confirm.addEventListener("click", function () {
        cart.style.display = "none";
        overlay.style.display = "grid";
        reject.addEventListener("click", function (event) {
            cart.style.display = "none";
            bg.style.filter="blur(0)";
        })
    })

    reject1.addEventListener("click", function () {
        overlay.style.display = "none";
        bg.style.filter="blur(0)";

    })

    addbutton.addEventListener("click", function (){
        cart.style.display = "grid";
        bg.style.filter="blur(10px)";
    })

    reject.addEventListener("click", function (){
        cart.style.display = "none";
        bg.style.filter="blur(0)";
    })

})


document.addEventListener('DOMContentLoaded', function() {
        document.getElementById("profile").addEventListener("click", function () {
            document.getElementById("title").innerHTML = `
            <div>Profile</div>
            <img src="../images/logo.png" alt="">
        `;

            document.getElementById("change-container").innerHTML = `
    <div class="profile-container">
            <div class="slideButton">
          <button class="customerProfile" id="customerProfile"><span>Profile</span></button>
          <button class="customerPassword" id="customerPassword"><span>Password and Security</span></button>
          <button class="customerLocation" id="customerLocation"><span>My Address</span></button>
        </div>
        <div>
            <div class="profcus" id="profcus">
                <div class="item-01">
                    <div>
                        <img class="user-image" src="../images/sampleimg.png" alt="" id="profile-pic">
                    </div>
                    <div class="insertImg">
                        <label class="upload-img-button" for="input-file">Update Image</label>
                        <input class="input" type="file" accept="image/jpg, image/png, image/jpeg" id="input-file">
                    </div>
                </div>
                <div class="item-02">
                    <div><span class="customer-name">tset</span></div>
                    <span>Customer Full Name</span>
                </div>
            </div>
                    
                <div class="profileInfo">
                    <div class="item-0">
                        <h4>Personal Information</h4>
                    </div>
                        <div class="item-1">
                            <div><span class="Username">Username:</span></div>
                            <span class="CustomerUser">Username</span>  
                        </div>
                        
                        <div class="item-2">
                            <div><span class="userid">User ID:</span></div>
                            <span class="CustomerId">00001</span>
                        </div>

                        <div class="item-3">
                            <div><span class="firstname">First Name:</span></div>
                            <span class="CustomerFname">Eren</span>
                        </div>

                        <div class="item-4">
                            <div><span class="lastname">Last Name:</span></div>
                            <span class="CustomerLname">Yeager</span>
                        </div>

                        <div class="item-5">
                            <div><span class="emill">Email Address:</span></div>
                            <span class="CustomerEmail">@gmail.com</span>
                        </div>

                        <div class="item-6">
                            <div><span class="number">Contact Number:</span></div>
                            <span class="CustomerNum">1234567890</span>
                        </div>
                </div>

            <div class="profaddress">
                <div class="item-10">
                    <h4>Address</h4>
                </div>
                <div class="item-11">
                    <div><span>Country</span></div>
                    <span class="country">PH</span>
                </div>    

                <div class="item-12">
                    <div><span>City</span></div>
                    <span class="city">Tagum</span>
                </div>
                    
                <div class="item-13">
                    <div><span>Zip Code</span></div>
                    <span class="zipcode">8100</span>
                </div>
                    
                <div class="item-14">
                    <div><span>Baranggay</span></div>
                    <span class="baranggay">Apokon</span>
                </div> 
                    
                <div class="item-15">
                    <div><span>Purok</span></div>
                    <span class="purok">Prk.1</span>
                </div>
            </div>
            </div>

            <div class="changepass">
                <div class="item-20"><h2>Change Password</h2></div>
                <div class="item-21">
                    <input type="text" required="required">
                    <span>New Password</span>
                    <i></i>
                </div>

                <div class="item-22">
                    <input type="text" required="required">
                    <span>Re-enter new password</span>
                    <i></i>
                </div>

                <div class="item-23">
                    <input type="text" required="required">
                    <span>Current password</span>
                    <i></i>
                </div>

                <div class="item-24">
                    <button><span>Change Password</span></button>
                </div>
            </div>

            <div class="location">
                <div class="item-30">
                    <h2>Change Location</h2>
                </div>
                
                <div class="item-31">
                    <input type="text" required="required">
                    <span>Country</span>
                    <i></i>
                </div>

                <div class="item-32">
                    <input type="text" required="required">
                    <span>City</span>
                    <i></i>
                </div>

                <div class="item-33">
                    <input type="text" required="required">
                    <span>Zip Code</span>
                    <i></i>
                </div>

                <div class="item-34">
                    <input type="text" required="required">
                    <span>Baranggay</span>
                    <i></i>
                </div>

                <div class="item-35">
                    <input type="text" required="required">
                    <span>Purok</span>
                    <i></i>
                </div>

                <div class="item-36">
                    <button>
                        <span>Change Address</span>
                    </button>
                </div>

            </div>

      </div>
        `;

            // Add event listeners for the new buttons
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
                profileInfo.style.display = "none";
                profaddress.style.display = "none";
                changepass.style.display = "none";
                locationSection.style.display = "none";
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

            // Initialize with only the profile section visible
            hideAllSections();
            profcus.style.display = "grid";
            profaddress.style.display = "grid"
            profileInfo.style.display = "grid"

            // Image Upload Functionality
            let profilePic = document.getElementById("profile-pic");
            let inputFile = document.getElementById("input-file");

            inputFile.onchange = function (){
                profilePic.src = URL.createObjectURL(inputFile.files[0]);
            }
        });

    document.getElementById("home").addEventListener("click", loadHome);

    document.addEventListener("click", function (event) {
        if (event.target.closest(".card-link")) {
            event.preventDefault();
            loadCardDetails();
        }
        if(event.target.closest("#add-design-button")){
            event.preventDefault();
            addadesign()
        }
        if(event.target.closest(".customize-design-button")){
            event.preventDefault();
            addadesign()
        }
    });

    function loadHome() {
        document.getElementById("title").innerHTML = `
        <div>Home</div>
        <img src="../images/logo.png" alt="">`;

        document.getElementById("change-container").innerHTML = `
    <div class="subTitle1">
      <div>Hot Designs🔥</div>
      <img src="../images/sampleimg.png" alt="">
    </div>
    <div class="hotDesigns">
      <div class="hotDesigns-container swiper">
        <div class="card-wrapper">
          <ul class="card-list swiper-wrapper">
            <li class="card-item swiper-slide">
              <a href="" class="card-link">
                <img src="../images/sampleimg.png" alt="" class="card-image">

                <h2 class="card-title">Black and Yellow Gaming Sports Jersey</h2>
              </a>
            </li>
            <li class="card-item swiper-slide">
              <a href="" class="card-link">
                <img src="../images/sampleimage2.jpg" alt="" class="card-image">

                <h2 class="card-title">Black and Red Football Jersey</h2>
              </a>
            </li>
            <li class="card-item swiper-slide">
              <a href="" class="card-link">
                <img src="../images/sampleimage3.jpg" alt="" class="card-image">

                <h2 class="card-title">Black, White, and Red Stripe Jersey</h2>
              </a>
            </li>
            <li class="card-item swiper-slide">
              <a href="" class="card-link">
                <img src="../images/sampleimage4.jpg" alt="" class="card-image">
                <h2 class="card-title">Golden State Warriors Style Jersey</h2>
              </a>
            </li>
          </ul>
          <div class="swiper-pagination"></div>
          <div class="swiper-slide-button swiper-button-prev"></div>
          <div class="swiper-slide-button swiper-button-next"></div>
        </div>
      </div>
      <a href="" class="explore-new-button">Explore New Designs</a>
    </div>
    <div class="subTitle2">
      <div></div>
      <div>New Designs</div>
    </div>
    <div class="newDesigns">
      <div class="newDesigns-container swiper">
        <div class="card-wrapper">
          <ul class="card-list swiper-wrapper">
            <li class="card-item swiper-slide">
              <a href="" class="card-link">
                <img src="../images/sampleimg.png" alt="" class="card-image">

                <h2 class="card-title">Black and Yellow Gaming Sports Jersey</h2>
              </a>
            </li>
            <li class="card-item swiper-slide">
              <a href="" class="card-link">
                <img src="../images/sampleimage2.jpg" alt="" class="card-image">

                <h2 class="card-title">Black and Red Football Jersey</h2>
              </a>
            </li>
            <li class="card-item swiper-slide">
              <a href="" class="card-link">
                <img src="../images/sampleimage3.jpg" alt="" class="card-image">

                <h2 class="card-title">Black, White, and Red Stripe Jersey</h2>
              </a>
            </li>
            <li class="card-item swiper-slide">
              <a href="" class="card-link">
                <img src="../images/sampleimage4.jpg" alt="" class="card-image">

                <h2 class="card-title">Golden State Warriors Style Jersey</h2>
              </a>
            </li>
          </ul>
          <div class="swiper-pagination"></div>
          <div class="swiper-slide-button swiper-button-prev"></div>
          <div class="swiper-slide-button swiper-button-next"></div>
        </div>
      </div>
      <div class="newDesigns-selection-container">
        <a class="add-design-button" id="add-design-button" href=""><img src="../images/add-design.png" alt="">Add A Design</a>
        <a href="" class="customize-design-button"><img src="../images/custom-design.png" alt="">Customize a Design</a>
      </div>
    </div>
  </div>`;

        new Swiper('.card-wrapper', {
            loop: true,
            spaceBetween: 30,
            pagination: { el: '.swiper-pagination', clickable: true, dynamicBullets: true },
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
            breakpoints: { 0: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
        });
    }
    function addadesign(){
        document.getElementById("title").innerHTML = `
            <div>Add A Design</div>
            <img src="../images/logo.png" alt="">`;
        document.getElementById("change-container").innerHTML = `
         <div class="completed-container">
        <div class="add-a-design-container">
            <div class="import-design-container">
                <img src="../images/default-tshirt.jpg" alt="" id="default-tshirt">
                <label class="input-file-button" for="input-file"><p>Input A Design</p></label>
                <input class="input-file" type="file" accept="image/jpeg, image/png, image/jpg" id="input-file">
            </div>
            <div class="design-info-container">
                <div class="title-1">Sizes</div>
                <div class="sizes-available">
                    <div>XS</div>
                    <div>S</div>
                    <div>M</div>
                    <div>L</div>
                    <div>XL</div>
                    <div>XXL</div>
                </div>
                <div class="title-2">Quantity</div>
                <div class="design-quantity-container">
                    <div class="title-2-1">
                        <div class="title-name">Name</div>
                        <div class="title-jersey">Jersey No.#</div>
                        <div class="title-size">Size</div>
                    </div>
                    <div class="design-info">
                        <div class="design-info-1">
                            <input type="text" placeholder="Enter Display Name">
                            <input type="text" placeholder="Enter Jersey No.">
                            <select name="sizes" id="">
                                <option value="XS">XS</option>
                            </select>
                        </div>
                        <div class="design-info-1">
                            <input type="text" placeholder="Enter Display Name">
                            <input type="text" placeholder="Enter Jersey No.">
                            <select name="sizes" id="">
                                <option value="XS">XS</option>
                            </select>
                        </div>
                        <div class="design-info-1">
                            <input type="text" placeholder="Enter Display Name">
                            <input type="text" placeholder="Enter Jersey No.">
                            <select name="sizes" id="">
                                <option value="XS">XS</option>
                            </select>
                        </div>
                        <button class="add-button">Add</button>

                        <div class="submit-cancel-container">
                            <button id="submit">Submit</button>
                            <button id="cancel">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
        document.getElementById("submit").addEventListener("click", loadHome);
        document.getElementById("cancel").addEventListener("click", loadHome);
    }
    function loadCardDetails() {
        document.getElementById("title").innerHTML = `
            <div>Product</div>
            <img src="../images/logo.png" alt="">`;
        document.getElementById("change-container").innerHTML = `
            <div class="completed-container">
                <div class="add-a-design-container">
                    <div class="import-design-container">
                        <button class="back-button" id="back-button">
                            <span class="material-symbols-outlined">undo</span>
                        </button>
                        <img src="../images/sampleimg.png" alt="" id="default-tshirt">
                    </div>
                    <div class="design-info-container">
                        <div class="title-1">Sizes</div>
                        <div class="sizes-available">
                            <div>XS</div> <div>S</div> <div>M</div>
                            <div>L</div> <div>XL</div> <div>XXL</div>
                        </div>
                        <div class="title-2">Quantity</div>
                        <div class="design-quantity-container">
                            <div class="title-2-1">
                                <div class="title-name">Name</div>
                                <div class="title-jersey">Jersey No.#</div>
                                <div class="title-size">Size</div>
                            </div>
                            <div class="design-info">
                                <div class="design-info-1">
                                    <input type="text" placeholder="Enter Display Name">
                                    <input type="text" placeholder="Enter Jersey No.">
                                    <select name="sizes">
                                        <option value="XS">XS</option>
                                        <option value="S">S</option>
                                        <option value="M">M</option>
                                        <option value="L">L</option>
                                        <option value="XL">XL</option>
                                        <option value="XXL">XXL</option>
                                    </select>
                                    <input type="text" placeholder="Enter Display Name">
                                    <input type="text" placeholder="Enter Jersey No.">
                                    <select name="sizes">
                                        <option value="XS">XS</option>
                                        <option value="S">S</option>
                                        <option value="M">M</option>
                                        <option value="L">L</option>
                                        <option value="XL">XL</option>
                                        <option value="XXL">XXL</option>
                                    </select>
                                    <input type="text" placeholder="Enter Display Name">
                                    <input type="text" placeholder="Enter Jersey No.">
                                    <select name="sizes">
                                        <option value="XS">XS</option>
                                        <option value="S">S</option>
                                        <option value="M">M</option>
                                        <option value="L">L</option>
                                        <option value="XL">XL</option>
                                        <option value="XXL">XXL</option>
                                    </select>
                                </div>
                                <button class="add-button">Add</button>
                                <div class="submit-cancel-container">
                                    <button id="submit">Submit</button>
                                    <button id="cancel">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
        document.getElementById("submit").addEventListener("click", loadHome);
        document.getElementById("cancel").addEventListener("click", loadHome);
        document.getElementById("back-button").addEventListener("click",loadHome);
    }
    function loaddesign(){
        document.getElementById("title").innerHTML=`
            <div>Design</div>
            <img src="../images/logo.png" alt="">`;
        document.getElementById("change-container").innerHTML=`
        <div class="main-container">
    <div class="category-container">
      <button class="nav-designs-button" id="hot">Hot</button>
      <button class="nav-designs-button" id="new">New</button>
      <button class="nav-designs-button" id="my">My Designs</button>
    </div>
    <div class="subTitle1" id="subTitle1">
      <div>Hot Designs🔥</div>
      <img src="../images/sampleimg.png" alt="">
    </div>
    <div class="allDesigns-container" id="subTitle2"></div>
  </div>`
        hotdesign()
        const buttons = document.querySelectorAll(".nav-designs-button");
        buttons.forEach(button =>{
            button.addEventListener("click", function(){
                // Remove 'active' class from all buttons
                buttons.forEach(btn => btn.classList.remove("active"));

                // Add 'active' class only to the clicked button
                button.classList.add("active");
            })
        })
    }
    function hotdesign(){
        document.getElementById("subTitle1").innerHTML=`
            <div>Hot Designs🔥</div>
            <img src="../images/sampleimg.png" alt="">`;
        document.getElementById("subTitle2").innerHTML=`
        <div class="customerhot-container">
        <div class="hotDesigns-container swiper">
        <div class="card-wrapper">
          <ul class="card-list swiper-wrapper">
            <li class="card-item swiper-slide">
              <a href="" class="card-link">
                <img src="../images/sampleimg.png" alt="" class="card-image">

                <h2 class="card-title">Black and Yellow Gaming Sports Jersey</h2>
              </a>
            </li>
            <li class="card-item swiper-slide">
              <a href="" class="card-link">
                <img src="../images/sampleimage2.jpg" alt="" class="card-image">

                <h2 class="card-title">Black and Red Football Jersey</h2>
              </a>
            </li>
            <li class="card-item swiper-slide">
              <a href="" class="card-link">
                <img src="../images/sampleimage3.jpg" alt="" class="card-image">

                <h2 class="card-title">Black, White, and Red Stripe Jersey</h2>
              </a>
            </li>
            <li class="card-item swiper-slide">
              <a href="" class="card-link">
                <img src="../images/sampleimage4.jpg" alt="" class="card-image">
                <h2 class="card-title">Golden State Warriors Style Jersey</h2>
              </a>
            </li>
          </ul>
          <div class="swiper-pagination"></div>
          <div class="swiper-slide-button swiper-button-prev"></div>
          <div class="swiper-slide-button swiper-button-next"></div>
        </div>
      </div>
      
      <div class="hotDesigns-container swiper">
        <div class="card-wrapper">
          <ul class="card-list swiper-wrapper">
            <li class="card-item swiper-slide">
              <a href="" class="card-link">
                <img src="../images/sampleimg.png" alt="" class="card-image">

                <h2 class="card-title">Black and Yellow Gaming Sports Jersey</h2>
              </a>
            </li>
            <li class="card-item swiper-slide">
              <a href="" class="card-link">
                <img src="../images/sampleimage2.jpg" alt="" class="card-image">

                <h2 class="card-title">Black and Red Football Jersey</h2>
              </a>
            </li>
            <li class="card-item swiper-slide">
              <a href="" class="card-link">
                <img src="../images/sampleimage3.jpg" alt="" class="card-image">

                <h2 class="card-title">Black, White, and Red Stripe Jersey</h2>
              </a>
            </li>
            <li class="card-item swiper-slide">
              <a href="" class="card-link">
                <img src="../images/sampleimage4.jpg" alt="" class="card-image">
                <h2 class="card-title">Golden State Warriors Style Jersey</h2>
              </a>
            </li>
          </ul>
          <div class="swiper-pagination"></div>
          <div class="swiper-slide-button swiper-button-prev"></div>
          <div class="swiper-slide-button swiper-button-next"></div>
        </div>
      </div>
      
      
           
           
          
      </div>`;
        new Swiper('.card-wrapper', {
            loop: true,
            spaceBetween: 30,
            pagination: { el: '.swiper-pagination', clickable: true, dynamicBullets: true },
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
            breakpoints: { 0: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
        });

    }
    function newdesign(){
        document.getElementById("subTitle1").innerHTML=`
        <div>New Design</div>
        <img src="../images/sampleimg.png" alt="">`;
        document.getElementById("subTitle2").innerHTML=`
        <div class="customerNewOrder-container">
            <div class="newDesigns-container swiper">
        <div class="card-wrapper">
          <ul class="card-list swiper-wrapper">
            <li class="card-item swiper-slide">
              <a href="" class="card-link">
                <img src="../images/sampleimg.png" alt="" class="card-image">

                <h2 class="card-title">Black and Yellow Gaming Sports Jersey</h2>
              </a>
            </li>
            <li class="card-item swiper-slide">
              <a href="" class="card-link">
                <img src="../images/sampleimage2.jpg" alt="" class="card-image">

                <h2 class="card-title">Black and Red Football Jersey</h2>
              </a>
            </li>
            <li class="card-item swiper-slide">
              <a href="" class="card-link">
                <img src="../images/sampleimage3.jpg" alt="" class="card-image">

                <h2 class="card-title">Black, White, and Red Stripe Jersey</h2>
              </a>
            </li>
            <li class="card-item swiper-slide">
              <a href="" class="card-link">
                <img src="../images/sampleimage4.jpg" alt="" class="card-image">

                <h2 class="card-title">Golden State Warriors Style Jersey</h2>
              </a>
            </li>
          </ul>
          <div class="swiper-pagination"></div>
          <div class="swiper-slide-button swiper-button-prev"></div>
          <div class="swiper-slide-button swiper-button-next"></div>
        </div>
      </div>
      
      <div class="newDesigns-container swiper">
        <div class="card-wrapper">
          <ul class="card-list swiper-wrapper">
            <li class="card-item swiper-slide">
              <a href="" class="card-link">
                <img src="../images/sampleimg.png" alt="" class="card-image">

                <h2 class="card-title">Black and Yellow Gaming Sports Jersey</h2>
              </a>
            </li>
            <li class="card-item swiper-slide">
              <a href="" class="card-link">
                <img src="../images/sampleimage2.jpg" alt="" class="card-image">

                <h2 class="card-title">Black and Red Football Jersey</h2>
              </a>
            </li>
            <li class="card-item swiper-slide">
              <a href="" class="card-link">
                <img src="../images/sampleimage3.jpg" alt="" class="card-image">

                <h2 class="card-title">Black, White, and Red Stripe Jersey</h2>
              </a>
            </li>
            <li class="card-item swiper-slide">
              <a href="" class="card-link">
                <img src="../images/sampleimage4.jpg" alt="" class="card-image">

                <h2 class="card-title">Golden State Warriors Style Jersey</h2>
              </a>
            </li>
          </ul>
          <div class="swiper-pagination"></div>
          <div class="swiper-slide-button swiper-button-prev"></div>
          <div class="swiper-slide-button swiper-button-next"></div>
        </div>
      </div>
        </div>`;

        new Swiper('.card-wrapper', {
            loop: true,
            spaceBetween: 30,
            pagination: { el: '.swiper-pagination', clickable: true, dynamicBullets: true },
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
            breakpoints: { 0: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
        });

    }
    function mydesign(){
        document.getElementById("subTitle1").innerHTML=`
        <div>My Design</div>
        <img src="../images/sampleimg.png" alt="">`
        document.getElementById("subTitle2").innerHTML=`
        <div class="customermyorder-container"></div>`
    }

        document.getElementById("design").addEventListener("click", loaddesign)
        document.addEventListener("click", function (event) {
            if (event.target.closest("#hot")) {
                event.preventDefault();
                hotdesign()
            }
            if(event.target.closest("#new")){
                event.preventDefault();
                newdesign();
            }
            if(event.target.closest("#my")){
                event.preventDefault();
                mydesign();
            }
        });

function addadesign(){
    document.getElementById("title").innerHTML=`
        <div>Add Design</div>
        <img src="../images/logo.png" alt="">`;
    document.getElementById("change-container").innerHTML=`
        <div class="completed-container">
        <div class="subTitle1">
            <div>Add A Design</div>
            <img src="../images/sampleimg.png" alt="">
        </div>
        <div class="add-a-design-container">
            <div class="import-design-container">
                <img src="../images/default-tshirt.jpg" alt="" id="default-tshirt">
                <label class="input-file-button" for="input-file"><p>Input A Design</p></label>
                <input class="input-file" type="file" accept="image/jpeg, image/png, image/jpg" id="input-file">
            </div>
            <div class="design-info-container">
                <div class="title-1">Sizes</div>
                <div class="sizes-available">
                    <div>XS</div>
                    <div>S</div>
                    <div>M</div>
                    <div>L</div>
                    <div>XL</div>
                    <div>XXL</div>
                </div>
                <div class="title-2">Quantity</div>
                <div class="design-quantity-container">
                    <div class="title-2-1">
                        <div class="title-name">Name</div>
                        <div class="title-jersey">Jersey No.#</div>
                        <div class="title-size">Size</div>
                    </div>
                    <div class="design-info">
                        <div class="design-info-1">
                            <input type="text" placeholder="Enter Display Name">
                            <input type="text" placeholder="Enter Jersey No.">
                            <select name="sizes" id="">
                                <option value="XS">XS</option>
                            </select>
                        </div>
                        <div class="design-info-1">
                            <input type="text" placeholder="Enter Display Name">
                            <input type="text" placeholder="Enter Jersey No.">
                            <select name="sizes" id="">
                                <option value="XS">XS</option>
                            </select>
                        </div>
                        <div class="design-info-1">
                            <input type="text" placeholder="Enter Display Name">
                            <input type="text" placeholder="Enter Jersey No.">
                            <select name="sizes" id="">
                                <option value="XS">XS</option>
                            </select>
                        </div>
                        <button class="add-button">Add</button>

                        <div class="submit-cancel-container">
                            <button id="submit">Submit</button>
                            <button id="cancel">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`
    document.getElementById("submit").addEventListener("click", loadHome);
    document.getElementById("cancel").addEventListener("click", loadHome);
}

    document.getElementById("add").addEventListener("click", addadesign);
    document.getElementById("order").addEventListener("click", loadorders);
    document.addEventListener("click", function (event) {
        if (event.target.closest("#sortButton")) {
            const selectedOption = document.getElementById('sortOptions');
            if (selectedOption) {
                sortTable(selectedOption.value);
            }
        }
        if (event.target.closest("#sortButton1")) {
            const selectedOption = document.getElementById('sortOptions1');
            if (selectedOption) {
                sortTable1(selectedOption.value);
            }
        }
    });

    function loadorders(){
        document.getElementById("title").innerHTML = `
                <div>Orders</div>
                <img src="../images/logo.png" alt="">`;
        document.getElementById("change-container").innerHTML = `
                <div class="completed-container">
        <div class="title-sort-container">
            <div class="title">Completed</div>
            <div class="sort">
                <select id="sortOptions1">
                    <option value="Order No.">Order No.#</option>
                    <option value="Description">Description</option>
                    <option value="Quantity">Quantity</option>
                    <option value="Payment">Payment Method</option>
                    <option value="Amount">Amount Paid</option>
                </select>
                <button id="sortButton1">Sort</button>
            </div>
        </div>
        <div class="completed-orders-container table1">
            <div class="completed-orders-column row1 header1">
                <p class="column-order-no cell1" data-column="Order No.">Order No.#</p>
                <p class="column-order-image cell1" data-column="Image">Image</p>
                <p class="column-order-description cell1" data-column="Description">Description</p>
                <p class="column-order-quantity cell1" data-column="Quantity">Quantity</p>
                <p class="column-order-payment cell1" data-column="Payment">Payment Method</p>
                <p class="column-order-amount cell1" data-column="Amount">Total Amount Paid</p>
            </div>
            <div class="completed-orders">
                <div class="orders row1">
                    <div class="order-no cell1" data-column="Order No.">1</div>
                    <div class="order-image cell1" data-column="Image"></div>
                    <div class="order-description cell1" data-column="Description">Black and Yellow Gaming sports Jersey</div>
                    <div class="order-quantity cell1" data-column="Quantity">10</div>
                    <div class="order-payment cell1" data-column="Payment">Self-Pickup</div>
                    <div class="order-amount cell1" data-column="Amount">5000.00</div>
                </div>
                <div class="orders row1">
                    <div class="order-no cell1" data-column="Order No.">2</div>
                    <div class="order-image cell1" data-column="Image"></div>
                    <div class="order-description cell1" data-column="Description">Black and Yellow Gaming sports Jersey</div>
                    <div class="order-quantity cell1" data-column="Quantity">10</div>
                    <div class="order-payment cell1" data-column="Payment">COD</div>
                    <div class="order-amount cell1" data-column="Amount">5100.00</div>
                </div>
                <div class="orders row1">
                    <div class="order-no cell1" data-column="Order No.">3</div>
                    <div class="order-image cell1" data-column="Image"></div>
                    <div class="order-description cell1" data-column="Description">Black and Yellow Gaming sports Jersey</div>
                    <div class="order-quantity cell1" data-column="Quantity">10</div>
                    <div class="order-payment cell1" data-column="Payment">COD</div>
                    <div class="order-amount cell1" data-column="Amount">5100.00</div>
                </div>
                <div class="orders row1">
                    <div class="order-no cell1" data-column="Order No.">4</div>
                    <div class="order-image cell1" data-column="Image"></div>
                    <div class="order-description cell1" data-column="Description">Black and Yellow Gaming sports Jersey</div>
                    <div class="order-quantity cell1" data-column="Quantity">10</div>
                    <div class="order-payment cell1" data-column="Payment">COD</div>
                    <div class="order-amount cell1" data-column="Amount">5100.00</div>
                </div>
            </div>
        </div>
    </div>
    <div class="pending-container">
        <div class="title-sort-container">
            <div class="title">Pending</div>
            <div class="sort">
                <select id="sortOptions">
                    <option value="Order No.">Order No.#</option>
                    <option value="Description">Description</option>
                    <option value="Quantity">Quantity</option>
                    <option value="Payment">Payment Method</option>
                    <option value="Amount">Amount Paid</option>
                </select>
                <button id="sortButton">Sort</button>
            </div>
        </div>
        <div class="pending-orders-container table">
            <div class="pending-orders-column row header">
                <p class="column-order-no cell" data-column="Order No.">Order No.#</p>
                <p class="column-order-image cell" data-column="Image">Image</p>
                <p class="column-order-description cell" data-column="Description">Description</p>
                <p class="column-order-quantity cell" data-column="Quantity">Quantity</p>
                <p class="column-order-payment cell" data-column="Payment">Payment Method</p>
                <p class="column-order-amount cell" data-column="Amount">Amount to Pay</p>
            </div>
            <div class="pending-orders">
                <div class="orders row">
                    <div class="order-no cell" data-column="Order No.">5</div>
                    <div class="order-image cell" data-column="Image"></div>
                    <div class="order-description cell" data-column="Description">Black and Yellow Gaming sports Jersey</div>
                    <div class="order-quantity cell" data-column="Quantity">10</div>
                    <div class="order-payment cell" data-column="Payment">Self-Pickup</div>
                    <div class="order-amount cell" data-column="Amount">5000.00</div>
                </div>
                <div class="orders row">
                    <div class="order-no cell" data-column="Order No.">6</div>
                    <div class="order-image cell" data-column="Image"></div>
                    <div class="order-description cell" data-column="Description">Black and Yellow Gaming sports Jersey</div>
                    <div class="order-quantity cell" data-column="Quantity">10</div>
                    <div class="order-payment cell" data-column="Payment">COD</div>
                    <div class="order-amount cell" data-column="Amount">5100.00</div>
                </div>
                <div class="orders row">
                    <div class="order-no cell" data-column="Order No.">7</div>
                    <div class="order-image cell" data-column="Image"></div>
                    <div class="order-description cell" data-column="Description">Black and Yellow Gaming sports Jersey</div>
                    <div class="order-quantity cell" data-column="Quantity">10</div>
                    <div class="order-payment cell" data-column="Payment">COD</div>
                    <div class="order-amount cell" data-column="Amount">5100.00</div>
                </div>
                <div class="orders row">
                    <div class="order-no cell" data-column="Order No.">8</div>
                    <div class="order-image cell" data-column="Image"></div>
                    <div class="order-description cell" data-column="Description">Black and Yellow Gaming sports Jersey</div>
                    <div class="order-quantity cell" data-column="Quantity">10</div>
                    <div class="order-payment cell" data-column="Payment">COD</div>
                    <div class="order-amount cell" data-column="Amount">5100.00</div>
                </div>
            </div>
        </div>
    </div>`
    }
    function sortTable(column) {
        const table = document.querySelector('.table');
        const header = table.querySelector('.header');
        const rows = Array.from(table.querySelectorAll('.row:not(.header)'));

        const sortedRows = rows.sort((a, b) => {
            const aCell = a.querySelector(`.cell[data-column="${column}"]`);
            const bCell = b.querySelector(`.cell[data-column="${column}"]`);

            if (!aCell || !bCell) {
                console.error('Cell not found for column:', column);
                return 0;
            }

            const aText = aCell.textContent.trim();
            const bText = bCell.textContent.trim();
            const aIsNumeric = !isNaN(Number(aText));
            const bIsNumeric = !isNaN(Number(bText));

            // Determine if the column is numeric or string
            if (column === 'Order No.') {
                return Number(aText) - Number(bText); // Numeric comparison for age
            }else if(column === 'Quantity'){
                return Number(aText) - Number(bText);
            } else {
                return aText.localeCompare(bText); // String comparison for name and country
            }
        });

        // Clear the table and append sorted rows
        // Instead of appending, we will insert before the header
        sortedRows.forEach(row => {
            table.insertBefore(row, header.nextSibling);
            table.style.overflow = 'auto';
            header.style.position = 'sticky';
            header.style.zIndex = '1';
            header.style.top = '0';
            header.style.background = 'white';
            header.style.borderBottom = '1px solid black'
            // Insert after the header
        });

    }
    function sortTable1(column) {
        const table1 = document.querySelector('.table1');
        const header1 = table1.querySelector('.header1');
        const rows1 = Array.from(table1.querySelectorAll('.row1:not(.header1)'));

        const sortedRows = rows1.sort((a, b) => {
            const aCell = a.querySelector(`.cell1[data-column="${column}"]`);
            const bCell = b.querySelector(`.cell1[data-column="${column}"]`);

            if (!aCell || !bCell) {
                console.error('Cell not found for column:', column);
                return 0; // Skip sorting if cell is not found
            }

            const aText = aCell.textContent.trim();
            const bText = bCell.textContent.trim();

            // Determine if the column is numeric or string
            if (column === 'Order No.' || column === 'Quantity') {
                return Number(aText) - Number(bText); // Numeric comparison for age
            } else {
                return aText.localeCompare(bText); // String comparison for name and country
            }
        });

        // Clear the table and append sorted rows
        // Instead of appending, we will insert before the header
        sortedRows.forEach(row => {
            table1.insertBefore(row, header1.nextSibling);
            table1.style.overflow = 'auto';
            header1.style.position = 'sticky';
            header1.style.zIndex = '1';
            header1.style.top = '0';
            header1.style.background = 'white';
            header1.style.borderBottom = '1px solid black'
            // Insert after the header
        });

    }
})