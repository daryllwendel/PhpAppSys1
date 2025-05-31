<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Profile</title>
    <link rel="stylesheet" href="{{asset("css/CustomerProfile.css")}}">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
</head>
<body>
  <div class="profilecontainer">
    <div class="profile-container">
        <!-- Navigation Sidebar -->
        <div class="slideButton">
          <button class="customerProfile" id="customerProfile">
            <span><span class="material-symbols-outlined"></span> Profile</span>
          </button>
          <button class="customerPassword" id="customerPassword">
            <span><span class="material-symbols-outlined"></span> Password & Security</span>
          </button>
          <button class="customerLocation" id="customerLocation">
            <span><span class="material-symbols-outlined"></span> My Address</span>
          </button>
        </div>

        <!-- Main Content Area -->
        <div class="content-area">
            <!-- Profile Section -->
            <div class="profile-section">
                <!-- User Profile Card -->
                <div class="profcus" id="profcus">
                    <div class="item-01">
                        <form action="{{route('user.upload')}}" class="profileimgage" method="POST" enctype="multipart/form-data">
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
                        <div><span>{{ $user->username }}</span></div>
                        <span class="name121">{{ $user->name }}</span>
                    </div>
                </div>

                <!-- Personal Information -->
                <div class="profileInfo">
                    <div class="item-0">
                        <h4>Personal Information</h4>
                    </div>
                    <div class="item-1">
                        <span class="Username">Username</span>
                        <span class="CustomerUser">{{ $user->username }}</span>
                    </div>

                    <div class="item-2">
                        <span class="userid">User ID</span>
                        <span class="CustomerId">{{ $user->id }}</span>
                    </div>

                    <div class="item-3">
                        <span class="firstname">Name</span>
                        <span class="CustomerFname">{{$user->name }}</span>
                    </div>

                    <div class="item-5">
                        <span class="emill">Email Address</span>
                        <span class="CustomerEmail">{{ $user->email }}</span>
                    </div>

                    <div class="item-6">
                        <span class="number">Contact Number</span>
                        <span class="CustomerNum">{{ $user->mobile_number }}</span>
                    </div>
                </div>

                <!-- Address Information -->
                <div class="profaddress">
                    <div class="item-10">
                        <h4>Address</h4>
                    </div>

                    <div class="item-11-1">
                        <span>Province</span>
                        <span>{{$user->Province}}</span>
                    </div>

                    <div class="item-11">
                        <span>City</span>
                        <span class="city">{{$user->City}}</span>
                    </div>

                    <div class="item-12">
                        <span>Baranggay</span>
                        <span class="baranggay">{{$user->Baranggay}}</span>
                    </div>

                    <div class="item-13">
                        <span>Zip Code</span>
                        <span class="zipcode">{{$user->ZipCode}}</span>
                    </div>

                    <div class="item-14">
                        <span>Purok</span>
                        <span class="purok">{{$user->Purok}}</span>
                    </div>
                </div>
            </div>

            <!-- Password Change Section -->
            <form action="/changepass" method="POST" class="changepass">
                @csrf
                <div class="item-20">
                    <h2>Change Password</h2>
                </div>
                <div class="item-21">
                    <input type="password" required name="newpass" id="newpass">
                    <span>New Password</span>
                    <i></i>
                </div>

                <div class="item-22">
                    <input type="password" required name="renewpass" id="renewpass">
                    <span>Re-enter new password</span>
                    <i></i>
                </div>

                <div class="item-23">
                    <input type="password" required name="currpass" id="currpass">
                    <span>Current password</span>
                    <i></i>
                </div>

                <div class="item-24">
                    <button type="submit"><span>Change Password</span></button>
                </div>
            </form>

            <!-- Location Change Section -->
            <form action="/location" class="location" method="POST" class="location">
                @csrf
                <div class="item-30">
                    <h2>Change Address</h2>
                </div>

                <div class="item-31-1">
                    <select name="Province" id="provinceSelect" required>
                        <option value="">Choose a Province</option>
                    </select>
                </div>

                <div class="item-32">
                    <select name="City" id="citySelect" required disabled>
                        <option value="">Choose a city</option>
                    </select>
                </div>

                <div class="item-33">
                    <input type="text" name="ZipCode" id="zipcode" required placeholder="Zip Code">
                </div>

                <div class="item-34">
                    <select name="Baranggay" id="baranggaySelect" disabled required>
                        <option value="">Choose a barangay</option>
                    </select>
                </div>

                <div class="item-35">
                    <input type="text" required name="Purok" id="purokInput" placeholder="Purok" disabled>
                </div>

                <div class="item-36">
                    <button type="submit">
                        <span>Save Changes</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
  </div>

  <script src="{{asset('js/customer-profile.js')}}"></script>
</body>
</html>
