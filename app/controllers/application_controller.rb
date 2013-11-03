class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session

  # rebuild parameters into the structure rails expects them (mainly:
  # they must be within a containing root attribute, and in snake_case).
  # Backbone sends them as camelCase and without a root node
  def process_params(val, root_node)
    attributes = val.except(:action, :controller, root_node)
    attributes = sanitize_params(attributes)
    attributes = deep_snake_case_params(attributes)
    params = {"#{root_node}" => attributes, "action" => val["action"], "controller" => val["controller"]}
    puts "rebuilt params: #{params}"
    params = ActionController::Parameters.new(params)
  end

  def sanitize_params(params)
    params.reject{|k,v| ["id"].include? k}
  end

  # convert all camelCase params (sent by Backbone to the API) to the
  # snake_case expected by Rails
  # from http://stackoverflow.com/questions/17240106/what-is-the-best-way-to-convert-all-controller-params-from-camelcase-to-snake-ca
  def deep_snake_case_params(val)
    case val
    when Array
      val.map {|v| deep_snake_case_params v }
    when Hash
      val.keys.each do |k, v = val[k]|
        val.delete k
        val[k.underscore] = deep_snake_case_params(v)
      end
     val
    else
     val
    end
  end
end
