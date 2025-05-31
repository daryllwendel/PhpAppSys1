<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class SetupApp extends Command
{
    protected $signature = 'app:setup';
    protected $description = 'Run migrations and seed default data';

    public function handle()
    {
        $this->call('migrate:fresh');
        $this->call('db:seed');
        $this->info('✅ Application is set up with default data.');
    }
}