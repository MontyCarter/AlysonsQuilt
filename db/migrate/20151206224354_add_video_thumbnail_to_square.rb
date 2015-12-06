class AddVideoThumbnailToSquare < ActiveRecord::Migration
  def up
    add_attachment :squares, :video_thumb
  end
  def down
    remove_attachment :squares, :video_thumb
  end
end
