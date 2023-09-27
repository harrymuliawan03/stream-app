<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Movie;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $data['featuredMovies'] = Movie::where('isFeatured', true)->get();
        $data['movies'] = Movie::all();
        return inertia('User/Dashboard/Index', $data);
    }
}