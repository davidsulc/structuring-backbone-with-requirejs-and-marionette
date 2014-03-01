class AcquaintanceshipsController < ApplicationController
  before_action :set_acquaintanceship

  respond_to :html, :json

  def link
    if @acquaintanceship
      respond_with(@acquaintanceship)
      return
    end

    if params[:contact] != params[:acquaintance]
      @acquaintanceship = Acquaintanceship.create!(contact_id: params[:contact], acquaintance_id: params[:acquaintance])
    else
      @acquaintanceship = nil
    end

    respond_to do |format|
      format.html { redirect_to controller: 'contacts_paginated', action: 'acquaintances', id: params[:contact] }
      if @acquaintanceship
        format.json { render action: 'show', status: :created }
      else
        format.json { render json: { message: "Self-referential relationships aren't supported" }, status: :unprocessable_entity }
      end
    end
  end

  def unlink
    @acquaintanceship.destroy if @acquaintanceship

    respond_to do |format|
      format.html { redirect_to controller: 'contacts_paginated', action: 'acquaintances', id: params[:contact] }
      format.json { head :no_content }
    end
  end

  private
    def set_acquaintanceship
      @acquaintanceship = Acquaintanceship.where("contact_id = ? AND acquaintance_id = ?", params[:contact], params[:acquaintance]).limit(1).first
    end

    #def acquaintanceship_url(acquaintanceship)
    #  http://localhost:3000/contacts/1901
    #  ''
    #  request.hostname + () + "/acquaintanceships/#{}
    #end
end
