class CreateSquares < ActiveRecord::Migration
  def change
    create_table :squares do |t|
      t.string :message
      t.string :signature
      t.attachment :media
      t.timestamps null: false
    end
  end
end
