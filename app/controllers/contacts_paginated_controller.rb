class ContactsPaginatedController < ApplicationController
  before_action :set_contact, except: [:index, :new, :create]

  respond_to :json

  # GET /contacts
  # GET /contacts.json
  def index
    query = Contact.order(:first_name)
    if params[:filter]
      c_table = Contact.arel_table
      query = query.where(c_table[:first_name].matches("%#{params[:filter]}%").
                       or(c_table[:last_name].matches("%#{params[:filter]}%")).
                       or(c_table[:phone_number].matches("%#{params[:filter]}%")))
    end
    @contacts, @count = paginate_query(query)
  end

  # GET /contacts/1
  # GET /contacts/1.json
  def show
    @include_acquaintaces = params[:include_acquaintances].to_i == 1
    respond_with(@contact)
  end

  # GET /contacts/new
  def new
    @contact = Contact.new
  end

  # GET /contacts/1/edit
  def edit
  end

  # POST /contacts
  # POST /contacts.json
  def create
    @contact = Contact.new(contact_params)

    respond_to do |format|
      if @contact.save
        format.html { redirect_to @contact, notice: 'Contact was successfully created.' }
        format.json { render action: 'show', status: :created, location: @contact }
      else
        format.html { render action: 'new' }
        format.json { render json: { entity: @contact, errors: @contact.errors_json }, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /contacts/1
  # PATCH/PUT /contacts/1.json
  def update
    @old_contact = @contact.dup
    respond_to do |format|
      if @contact.update(contact_params)
        format.html { redirect_to @contact, notice: 'Contact was successfully updated.' }
        format.json { render action: 'show', status: :ok, location: @contact }
      else
        format.html { render action: 'edit' }
        format.json { render json: { entity: @old_contact, errors: @contact.errors_json }, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /contacts/1
  # DELETE /contacts/1.json
  def destroy
    @contact.destroy
    respond_to do |format|
      format.html { redirect_to contacts_url }
      format.json { head :no_content }
    end
  end

  # display the contact's acquaintances
  # GET /contacts/1/acquaintances
  # GET /contacts/1/acquaintances.json
  def acquaintances
    query = @contact.acquaintances.order(:first_name)
    @contacts, @count = paginate_query(query)
    render 'index'
  end

  # display the contact's that are not acquaintances
  # (i.e. acquaintances + strangers == Contact.all - this contact)
  # GET /contacts/1/strangers
  # GET /contacts/1/strangers.json
  def strangers
    excluded = [@contact.id]
    excluded += @contact.acquaintances.select("contacts.id").map {|c| c.id }
    query = Contact.where("id NOT IN (?)", excluded).order(:first_name)
    @contacts, @count = paginate_query(query)
    render 'index'
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_contact
      @contact = Contact.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def contact_params
      if parameters=params
        params = process_params(parameters, "contact")
      end
      params.require(:contact).permit(:first_name, :last_name, :phone_number)
    end

    # apply pagination parameters to a query, returning the paginated query, and a count of results
    def paginate_query(orig_query)
      paginated_query = orig_query
      paginated_query = paginated_query.offset(params[:offset]) if params[:offset]
      paginated_query = paginated_query.limit(params[:count]) if params[:count]

      return paginated_query, orig_query.count
    end
end
