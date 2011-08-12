class ItemsController < ApplicationController
  def index
    render :json => Item.all
  end
  
  def show
    render :json => Item.find(params[:id])
  end
  
  def create
    item = Item.create! params
    render :json => item
  end
  
  def update
    item = Item.find(params[:id])
    item.update_attributes! params
    render :json => item
  end
end