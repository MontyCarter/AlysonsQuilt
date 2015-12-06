class AddAttachmentToSquare < ActiveRecord::Migration
  def change
    change_table :squares do |t|
      t.attachment :photo
      t.attachment :video
    end
  end
end
