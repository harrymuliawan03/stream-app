<?php

namespace App\Http\Controllers\Admin;

use App\Models\Movie;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\Admin\Movie\Store;
use App\Http\Requests\Admin\Movie\Update;

class MovieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data['movies'] = Movie::all();
        $data['restore_movies'] = Movie::onlyTrashed()->get();
        return inertia('Admin/Movie/Index', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Admin/Movie/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Store $request)
    {
        $data =  $request->all();

        $data['thumbnail'] = Storage::disk('public')->put('movies', $request->file('thumbnail'));
        $data['slug'] = Str::slug($data['name']);
        
        $movie = Movie::create($data);

        return redirect(route('admin.dashboard.movie.index'))->with([
            'message' => 'Movie Inserted Successfully',
            'type' => 'sucess',
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Movie $movie)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Movie $movie)
    {
        $data['movie'] = $movie;
        return inertia('Admin/Movie/Edit', $data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Update $request, Movie $movie)
    {
        $data = $request->validated();
        if($request->file('thumbnail')) {
            $data['thumbnail'] = Storage::disk('public')->put('movies', $request->file('thumbnail'));
        } else{
            $data['thumbnail'] = $movie->thumbnail;
        }

        $movie->update($data);
        
        return redirect(route('admin.dashboard.movie.index'))->with([
            'message' => 'Movie update successfully',
            'type' => 'success',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Movie $movie)
    {
        $movie->delete();

        return redirect()->back()->with([
            'message' => 'Movie delete successfully',
            'type' => 'success',
        ]);
    }

    public function restore()
    {
        $data['restore_movies'] = Movie::onlyTrashed()->get();
        return inertia('Admin/Movie/Restore', $data);
    }
    
    public function restore_movie($id)
    {
        Movie::onlyTrashed()->find($id)->restore();
        return redirect(route('admin.dashboard.restore'))->with([
            'message' => 'Movie restore successfully',
            'type' => 'success',
        ]);
    }
}