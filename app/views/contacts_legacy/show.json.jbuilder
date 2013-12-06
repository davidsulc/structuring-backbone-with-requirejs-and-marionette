result = json.contact do
  json.extract! @contact, :id, :first_name, :last_name, :phone_number, :created_at, :updated_at
end

result['avatar-url'] = "http://example.com/#{@contact.id}"
result
