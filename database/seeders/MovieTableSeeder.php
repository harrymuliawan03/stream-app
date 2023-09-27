<?php

namespace Database\Seeders;

use App\Models\Movie;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MovieTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $movie = [
            [
                'name' => 'One Piece',
                'slug' => 'one-piece',
                'category' => 'Anime',
                'video_url' => 'https://www.youtube.com/watch?v=HlkXc6GW2Js&ab_channel=DevilNoMi',
                'thumbnail' => 'https://picsum.photos/id/1/300/300',
                'rating' => 4.5,
                'isFeatured' => 1,
            ],
            [
                'name' => 'The Batman',
                'slug' => 'the-batman',
                'category' => 'Action',
                'video_url' => 'https://www.youtube.com/watch?v=mqqft2x_Aa4&ab_channel=WarnerBros.Pictures',
                'thumbnail' => 'https://picsum.photos/id/1/300/300',
                'rating' => 4.9,
                'isFeatured' => 1,
            ],
            [
                'name' => 'Iron Man',
                'slug' => 'iron-man',
                'category' => 'Action',
                'video_url' => 'https://www.youtube.com/watch?v=XNd0OJK7Ze8&ab_channel=AllPowersExplained',
                'thumbnail' => 'https://picsum.photos/id/1/300/300',
                'rating' => 4.2,
                'isFeatured' => 1,
            ]
        ];

        Movie::insert($movie);
    }
}