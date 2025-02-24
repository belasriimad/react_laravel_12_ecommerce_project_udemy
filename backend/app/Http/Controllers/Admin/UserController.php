<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

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
        $user->delete();

        return redirect()->route('admin.users.index')->with([
            'success' => 'User has been deleted successfully'
        ]);
    }
}
