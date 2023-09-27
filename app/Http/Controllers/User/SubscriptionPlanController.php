<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\SubscriptionPlan;
use App\Models\UserSubscription;
use Carbon\Carbon;
use Illuminate\Http\Request;

class SubscriptionPlanController extends Controller
{
    public function index()
    {
        $data['subscriptionPlans'] = SubscriptionPlan::all();
        return inertia('User/Dashboard/SubscriptionPlan/Index', $data);
    }

    public function userSubscribe(Request $request, SubscriptionPlan $subscriptionPlan)
    {
        // ['user_id', 'subscription_plan_id', 'price', 'expired_date', 'payment_status', 'snapToken']
        $data = [
            'user_id' => auth()->user()->id,
            'subscription_plan_id' => $subscriptionPlan->id,
            'price' => $subscriptionPlan->price,
            'expired_date' => Carbon::now()->addMonths($subscriptionPlan->active_periode_in_months),
            'payment_status' => 'paid',
        ];
        
        $userSubcription = UserSubscription::create($data);

        return redirect(route('user.dashboard.index'));
    }
}