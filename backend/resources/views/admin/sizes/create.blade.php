@extends('admin.layouts.app')

@section('title')
    Add new size
@endsection

@section('content')
    <div class="row">
        @include('admin.layouts.sidebar')
        <div class="col-md-9">
            <div class="row mt-2">
                <div class="col-md-12">
                    <div class="card-header bg-white">
                        <h3 class="mt-2">Add Size</h3>
                        <hr>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6 mx-auto">
                                <form action="{{route('admin.sizes.store')}}" method="post">
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