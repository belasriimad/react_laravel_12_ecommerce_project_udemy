<div class="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
    <div class="offcanvas-md offcanvas-end bg-body-tertiary" tabindex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="sidebarMenuLabel">React T-shirts</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
            <ul class="nav flex-column">
                <li class="nav-item">
                    <a class="nav-link d-flex align-items-center gap-2" aria-current="page" href="{{route('admin.index')}}">
                        <i class="fas fa-dashboard"></i>
                        Dashboard
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link d-flex align-items-center gap-2" aria-current="page" href="{{route('admin.colors.index')}}">
                        <i class="fas fa-palette"></i>
                        Colors
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link d-flex align-items-center gap-2" aria-current="page" href="{{route('admin.sizes.index')}}">
                        <i class="fas fa-expand"></i>
                        Sizes
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link d-flex align-items-center gap-2" aria-current="page" href="{{route('admin.coupons.index')}}">
                        <i class="fas fa-ticket"></i>
                        Coupons
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link d-flex align-items-center gap-2" aria-current="page" href="{{route('admin.products.index')}}">
                        <i class="fas fa-tags"></i>
                        Products
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link d-flex align-items-center gap-2" aria-current="page" href="{{route('admin.orders.index')}}">
                        <i class="fas fa-cart-shopping"></i>
                        Orders
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link d-flex align-items-center gap-2" aria-current="page" href="{{route('admin.reviews.index')}}">
                        <i class="fas fa-star"></i>
                        Reviews
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link d-flex align-items-center gap-2" aria-current="page" href="{{route('admin.users.index')}}">
                        <i class="fas fa-users"></i>
                        Users
                    </a>
                </li>
            </ul>
            <hr class="my-3">
            <ul class="nav flex-column mb-auto">
                <li class="nav-item">
                    <a class="nav-link d-flex align-items-center gap-2"
                        onclick="document.getElementById('AdminLogoutForm').submit()"
                        href="#">
                        <i class="fas fa-sign-out"></i>
                        Sign out
                    </a>
                    <form id="AdminLogoutForm" action="{{route('admin.logout')}}" method="post">
                        @csrf
                    </form>
                </li>
            </ul>
        </div>
    </div>
</div>