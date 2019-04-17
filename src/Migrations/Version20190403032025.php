<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190403032025 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'sqlite', 'Migration can only be executed safely on \'sqlite\'.');

        $this->addSql('CREATE TABLE test (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, paypal CLOB DEFAULT NULL --(DC2Type:json_array)
        )');
        $this->addSql('DROP INDEX IDX_887F1FD14584665A');
        $this->addSql('DROP INDEX IDX_887F1FD19395C3F3');
        $this->addSql('CREATE TEMPORARY TABLE __temp__cart_model AS SELECT id, customer_id, product_id, qty FROM cart_model');
        $this->addSql('DROP TABLE cart_model');
        $this->addSql('CREATE TABLE cart_model (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, customer_id INTEGER NOT NULL, product_id INTEGER NOT NULL, qty INTEGER NOT NULL, CONSTRAINT FK_887F1FD19395C3F3 FOREIGN KEY (customer_id) REFERENCES user (id) NOT DEFERRABLE INITIALLY IMMEDIATE, CONSTRAINT FK_887F1FD14584665A FOREIGN KEY (product_id) REFERENCES product_model (id) NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('INSERT INTO cart_model (id, customer_id, product_id, qty) SELECT id, customer_id, product_id, qty FROM __temp__cart_model');
        $this->addSql('DROP TABLE __temp__cart_model');
        $this->addSql('CREATE INDEX IDX_887F1FD14584665A ON cart_model (product_id)');
        $this->addSql('CREATE INDEX IDX_887F1FD19395C3F3 ON cart_model (customer_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'sqlite', 'Migration can only be executed safely on \'sqlite\'.');

        $this->addSql('DROP TABLE test');
        $this->addSql('DROP INDEX IDX_887F1FD19395C3F3');
        $this->addSql('DROP INDEX IDX_887F1FD14584665A');
        $this->addSql('CREATE TEMPORARY TABLE __temp__cart_model AS SELECT id, customer_id, product_id, qty FROM cart_model');
        $this->addSql('DROP TABLE cart_model');
        $this->addSql('CREATE TABLE cart_model (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, customer_id INTEGER NOT NULL, product_id INTEGER NOT NULL, qty INTEGER NOT NULL)');
        $this->addSql('INSERT INTO cart_model (id, customer_id, product_id, qty) SELECT id, customer_id, product_id, qty FROM __temp__cart_model');
        $this->addSql('DROP TABLE __temp__cart_model');
        $this->addSql('CREATE INDEX IDX_887F1FD19395C3F3 ON cart_model (customer_id)');
        $this->addSql('CREATE INDEX IDX_887F1FD14584665A ON cart_model (product_id)');
    }
}
