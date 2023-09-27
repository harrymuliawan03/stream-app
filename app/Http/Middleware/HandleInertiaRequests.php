<?php

namespace App\Http\Middleware;

use Carbon\Carbon;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */

    private function activePlan()
    {
        $activePlan = Auth::user() ? Auth::user()->lastActiveUserSubscription : null;
        if (!$activePlan) {
            return null;
        }
        
        $data['name'] = $activePlan->subscriptionPlan->name;
        $data['lastDays'] = Carbon::parse($activePlan->updated_at)->addMonths($activePlan->subscriptionPlan->active_periode_in_months);
        $data['activeDays'] = Carbon::parse($activePlan->updated_at)->diffInDays($data['lastDays']);
        $data['remainingActiveDays'] = Carbon::parse($activePlan->expired_date)->diffInDays(Carbon::now());

        return $data;
    }
    
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
                'activePlan' => $this->activePlan(),
            ],
            'flashMessage' => [
                'message' => Session::get('message'),
                'type' => Session::get('type'),
            ],
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];
    }
}