class CreateJoinTableSquareUser < ActiveRecord::Migration
  def change
    create_join_table :squares, :users do |t|
      # t.index [:square_id, :user_id]
      # t.index [:user_id, :square_id]
    end
  end
end
