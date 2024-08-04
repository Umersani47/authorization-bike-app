class CreateBikes < ActiveRecord::Migration[7.0]
  def change
    create_table :bikes do |t|
      t.string :title
      t.text :description
      t.decimal :price
      t.string :engine_no
      t.string :engine_size
      t.string :model
      t.string :image_url
      t.integer :quantity

      t.timestamps
    end
  end
end
