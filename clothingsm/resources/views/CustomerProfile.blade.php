<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="{{asset("css/CustomerProfile.css")}}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=arrow_forward" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"/>
</head>
<body>
  <div class="profilecontainer" id="profilecontainer">
    <div class="profile-container">
        <div class="slideButton">
          <button class="customerProfile" id="customerProfile"><span>Profile</span></button>
          <button class="customerPassword" id="customerPassword"><span>Password and Security</span></button>
          <button class="customerLocation" id="customerLocation"><span>My Address</span></button>
        </div>
        <div>
            <div class="profcus" id="profcus">
                <div class="item-01">
                    <form action="{{route('user.upload')}}" method="POST" enctype="multipart/form-data">
                        @csrf
                    <div>
                        @if(Auth::user()->profile)
                            <img class="user-image" src="{{ asset('storage/' . Auth::user()->profile) }}" alt="Profile Picture" id="profile-pic">
                        @else
                            <img class="user-image" src="{{ asset('images/user.png') }}" alt="Profile Picture" id="profile-pic">
                        @endif

                    </div>
                   
                        <div class="insertImg">
                            <label class="upload-img-button" for="input-file">Update Image</label>
                            <input class="input" type="file" name="profilepic" accept="image/jpg, image/png, image/jpeg" id="input-file">
                            <button type="submit">Save</button>
                        </div>
                    </form>
                </div>
                <div class="item-02">
                    <div><span>{{ $username }}</span></div>
                    <span>{{ $name}}</span>
                </div>
            </div>
                    
                <div class="profileInfo">
                    <div class="item-0">
                        <h4>Personal Information</h4>
                    </div>
                        <div class="item-1">
                            <div><span class="Username">Username:</span></div>
                            <span class="CustomerUser">{{ $username }}</span>  
                        </div>
                        
                        <div class="item-2">
                            <div><span class="userid">User ID:</span></div>
                            <span class="CustomerId">{{ $id}}</span>
                        </div>

                        <div class="item-3">
                            <div><span class="firstname">Name:</span></div>
                            <span class="CustomerFname">{{ $name}}</span>
                        </div>

                        <div class="item-4">
                            <div><span class="lastname"></span></div>
                            <span class="CustomerLname"></span>
                        </div>

                        <div class="item-5">
                            <div><span class="emill">Email Address:</span></div>
                            <span class="CustomerEmail">{{ $email}}</span>
                        </div>

                        <div class="item-6">
                            <div><span class="number">Contact Number:</span></div>
                            <span class="CustomerNum">{{ $mobile_number}}</span>
                        </div>
                </div>

            <div class="profaddress">
                <div class="item-10">
                    <h4>Address</h4>
                </div>

                <div class="item-11-1">
                    <div><span>Province</span></div>
                    <span>{{$province}}</span>
                </div>

                <div class="item-11">
                    <div><span></span>City</div>
                    <span class="city">{{$city}}</span>
                </div>    

                <div class="item-12">
                    <div><span>Baranggay</span></div>
                    <span class="baranggay">{{$baranggay}}</span>
                </div>
                    
                <div class="item-13">
                    <div><span>Zip Code</span></div>
                    <span class="zipcode">{{$zipcode}}</span>
                </div>
                    
                <div class="item-14">
                    <div><span>Purok</span></div>
                    <span class="purok">{{$purok}}</span>
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

            <form action="/location" method="POST">
                @csrf
                <div class="location">
                    <div class="item-30">
                        <h2>Change Location</h2>
                    </div>
                    
                    <div class="item-31-1">
                        <select name="Province" id="provinceSelect">
                            <option value="">Choose a Province</option>
                        </select>
                    </div>

                    <div class="item-32">
                        <select name="City" id="citySelect" required disabled>
                            <option value="">Choose a city</option>
                        </select>
                    </div>
            
                    <div class="item-33">
                        <input type="text" name="ZipCode" id="zipcode"  required placeholder="ZipCode">
                    </div>
            
                    <div class="item-34">
                        <select name="Baranggay" id="baranggaySelect" disabled required>
                            <option value="">Choose a barangay</option>
                        </select>
                    </div>
            
                    <div class="item-35">
                        <input type="text" required name="Purok" id="purokInput" placeholder="Purok" disabled>
                        <i></i>
                    </div>
            
                    <div class="item-36">
                        <button type="submit">
                            <span>Change Address</span>
                        </button>
                    </div>
                </div>
            </form>
      </div>
  </div>
  <script src="{{asset("js/customer-profile.js")}}"></script>
  <script src="{{asset("js/customerJS.js")}}"></script>
</body>
</html>