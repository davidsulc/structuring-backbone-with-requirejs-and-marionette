json.extract! @contact, :id, :first_name, :last_name, :phone_number, :created_at, :updated_at

if @include_acquaintaces
  json.acquaintances @contact.acquaintances, :id, :first_name, :last_name, :phone_number
end
