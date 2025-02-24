@extends('admin.layouts.app')

@section('title')
    Add new product
@endsection

@section('content')
    <div class="row">
        @include('admin.layouts.sidebar')
        <div class="col-md-9">
            <div class="row mt-2">
                <div class="col-md-12">
                    <div class="card-header bg-white">
                        <h3 class="mt-2">Add Product</h3>
                        <hr>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6 mx-auto">
                                <form action="{{route('admin.products.store')}}" method="post" enctype="multipart/form-data">
                                    @csrf
                                    <div class="form-floating mb-3">
                                        <input type="text" class="form-control @error('name') is-invalid @enderror" id="floatingInput" 
                                            name="name" placeholder="Name"
                                            value="{{old('name')}}">
                                        <label for="floatingInput">Name*</label>
                                        @error('name')
                                            <span class="invalid-feedback">
                                                <strong>{{$message}}</strong>    
                                            </span>   
                                        @enderror
                                    </div>
                                    <div class="form-floating mb-3">
                                        <input type="number" class="form-control @error('qty') is-invalid @enderror" id="floatingInput" 
                                            name="qty" placeholder="Quantity"
                                            value="{{old('qty')}}">
                                        <label for="floatingInput">Quantity*</label>
                                        @error('qty')
                                            <span class="invalid-feedback">
                                                <strong>{{$message}}</strong>    
                                            </span>   
                                        @enderror
                                    </div>
                                    <div class="form-floating mb-3">
                                        <input type="number" class="form-control @error('price') is-invalid @enderror" id="floatingInput" 
                                            name="price" placeholder="Price"
                                            value="{{old('price')}}">
                                        <label for="floatingInput">Price*</label>
                                        @error('price')
                                            <span class="invalid-feedback">
                                                <strong>{{$message}}</strong>    
                                            </span>   
                                        @enderror
                                    </div>
                                    <div class="mb-3">
                                        <label for="color_id" class="my-2">Choose a color*</label>
                                        <select name="color_id[]" id="color_id" class="form-control @error('color_id') is-invalid @enderror"
                                            multiple>
                                            @foreach ($colors as $color)
                                                <option 
                                                    @if(collect(old('color_id'))->contains($color->id)) selected @endif
                                                    value="{{$color->id}}">
                                                    {{$color->name}}
                                                </option>
                                            @endforeach
                                        </select>
                                        @error('color_id')
                                            <span class="invalid-feedback">
                                                <strong>{{$message}}</strong>    
                                            </span>   
                                        @enderror
                                    </div>
                                    <div class="mb-3">
                                        <label for="size_id" class="my-2">Choose a size*</label>
                                        <select name="size_id[]" id="size_id" class="form-control @error('size_id') is-invalid @enderror"
                                            multiple>
                                            @foreach ($sizes as $size)
                                                <option 
                                                    @if(collect(old('size_id'))->contains($size->id)) selected @endif
                                                    value="{{$size->id}}">
                                                    {{$size->name}}
                                                </option>
                                            @endforeach
                                        </select>
                                        @error('size_id')
                                            <span class="invalid-feedback">
                                                <strong>{{$message}}</strong>    
                                            </span>   
                                        @enderror
                                    </div>
                                    <div class="mb-3">
                                        <label for="desc" class="my-2">Description*</label>
                                        <textarea rows="10" class="form-control summernote @error('desc') is-invalid @enderror" id="floatingInput" 
                                            name="desc" placeholder="Description"
                                        >{{old('desc')}}</textarea> 
                                        @error('desc')
                                            <span class="invalid-feedback">
                                                <strong>{{$message}}</strong>    
                                            </span>   
                                        @enderror
                                    </div>
                                    <div class="mb-3">
                                        <label for="thumbnail">Thumbnail*</label>
                                        <input type="file" class="form-control @error('thumbnail') is-invalid @enderror"
                                            name="thumbnail" id="thumbnail">
                                        @error('thumbnail')
                                            <span class="invalid-feedback">
                                                <strong>{{$message}}</strong>    
                                            </span>   
                                        @enderror
                                    </div>
                                    <div class="mt-2">
                                        <img src="#" id="thumbnail_preview"
                                            class="d-none img-fluid rounded mb-2"
                                            width="100"
                                            height="100"
                                        >
                                    </div>
                                    <div class="mb-3">
                                        <label for="first_image">First Image*</label>
                                        <input type="file" class="form-control @error('first_image') is-invalid @enderror" id="first_image" 
                                            name="first_image">
                                        @error('first_image')
                                            <span class="invalid-feedback">
                                                <strong>{{$message}}</strong>    
                                            </span>   
                                        @enderror
                                    </div>
                                    <div class="mt-2">
                                        <img src="#" id="first_image_preview"
                                            class="d-none img-fluid rounded mb-2"
                                            width="100"
                                            height="100"
                                        >
                                    </div>
                                    <div class="mb-3">
                                        <label for="second_image">Second Image*</label>
                                        <input type="file" class="form-control @error('second_image') is-invalid @enderror" id="second_image" 
                                            name="second_image">
                                        @error('second_image')
                                            <span class="invalid-feedback">
                                                <strong>{{$message}}</strong>    
                                            </span>   
                                        @enderror
                                    </div>
                                    <div class="mt-2">
                                        <img src="#" id="second_image_preview"
                                            class="d-none img-fluid rounded mb-2"
                                            width="100"
                                            height="100"
                                        >
                                    </div>
                                    <div class="mb-3">
                                        <label for="third_image">Third Image*</label>
                                        <input type="file" class="form-control @error('third_image') is-invalid @enderror" id="third_image" 
                                            name="third_image">
                                        @error('third_image')
                                            <span class="invalid-feedback">
                                                <strong>{{$message}}</strong>    
                                            </span>   
                                        @enderror
                                    </div>
                                    <div class="mt-2">
                                        <img src="#" id="third_image_preview"
                                            class="d-none img-fluid rounded mb-2"
                                            width="100"
                                            height="100"
                                        >
                                    </div>
                                    <div class="mb-2">
                                        <button type="submit" class="btn btn-sm btn-dark">
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection