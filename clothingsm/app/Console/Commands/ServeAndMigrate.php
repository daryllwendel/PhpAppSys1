<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Artisan;
use PDO;

class ServeAndMigrate extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:serve-and-migrate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $dbName = config('database.connections.mysql.clothingsm');
        $dbUser = config('database.connections.mysql.root');
        $dbPass = config('database.connections.mysql. ');
        $dbHost = config('database.connections.mysql.host');

        try {
            $pdo = new PDO("mysql:host=$dbHost", $dbUser, $dbPass);

            $pdo->exec("CREATE DATABASE IF NOT EXISTS `$dbName` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;");
            $this->info("✅ Database '$dbName' checked/created.");

        } catch (\PDOException $e) {
            $this->error("Could not connect to MySQL or create the database: " . $e->getMessage());
            return 1;
        }
        $this->call('migrate', ['--force' => true]);

        $this->call('db:seed', ['--force' => true]);

        $this->call('serve');

        return 0;
    }
}
