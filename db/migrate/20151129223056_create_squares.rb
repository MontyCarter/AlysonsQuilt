class CreateSquares < ActiveRecord::Migration
  def change
    create_table :squares do |t|
      t.text :message

      t.timestamps null: false
    end
  end
end
