class CreatePurchases < ActiveRecord::Migration[7.0]
  def change
    create_table :purchases do |t|
      t.references :user, null: false, foreign_key: true
      t.references :bike, null: false, foreign_key: true
      t.decimal :price
      t.datetime :purchased_at

      t.timestamps
    end
  end
end
