<?php

namespace App\Providers;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        if (app()->environment('local')) {
            $databaseName = 'clothingsm';

            // Temporarily remove the database name to allow a connection without selecting DB
            config(['database.connections.mysql.database' => null]);

            try {
                DB::connection('mysql')->getPdo();
            } catch (\Exception $e) {
                // Create the database
                DB::statement("CREATE DATABASE IF NOT EXISTS `$databaseName` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
            }

            // Restore the config to use the newly created database
            config(['database.connections.mysql.database' => $databaseName]);

            // IMPORTANT: Reconnect with new config
            DB::purge('mysql');
            DB::reconnect('mysql');

            // NOW run the migrations
            Artisan::call('migrate', ['--force' => true]);
        }

    } 
}
