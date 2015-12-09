
Paperclip.interpolates :content_type_extension do |attachment, style_name|
  case
  when ((style = attachment.styles[style_name]) && 
        !style[:format].blank?) 
  then 
    style[:format]
  when attachment.instance.video? && style_name.to_s != 'original' 
  then 
    'png'
  else
    File.extname(attachment.original_filename).gsub(/^\.+/, "")
  end
end
