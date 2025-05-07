<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class UserController extends Controller
{
    /**
     * Get all the users
     */
    public function index()
    {
        return view('admin.users.index')->with([
            'users' => User::latest()->get()
        ]);
    }

    /**
     * Delete users
     */
    public function delete(User $user)
    {
        //check if the old image exists and remove it
        if(File::exists(public_path($request->user()->profile_image))) {
            File::delete(public_path($request->user()->profile_image));
        }
        
        $user->delete();

        return redirect()->route('admin.users.index')->with([
            'success' => 'User has been deleted successfully'
        ]);
    }
}
