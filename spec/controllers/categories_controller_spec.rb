RSpec.describe CategoriesController, type: :controller do

  let!(:user) { create(:user) }
  let!(:admin) { create(:admin) }
  let!(:sector) { create(:sector) }
  let!(:category) { create(:category, sector: sector) }
  let!(:collection) { create(:collection, category: category) }
  let!(:resources) { create_list(:resource, 3, owner: user, collection: collection) }
  let!(:upvote) { create(:upvote, user: user, resource: resources.first) }
  let(:json) { JSON.parse(response.body) }

  describe 'GET#index' do

    context 'anonymous user' do

      before do
        get :index, :format => :json
      end

      it { should respond_with(200) }

      it 'should return a collection of categories' do
        expect(json).to be_an(Array)
      end

      it 'should return the total number of collections per category' do
        expect(json[0]).to have_key("collection_total")
      end

      it 'should return the total number of resources per category' do
        expect(json[0]).to have_key("resource_total")
      end

    end

    context 'logged in user' do

      before do
        sign_in user
        get :index, :format => :json
      end

      it { should respond_with(200) }

      it 'should return a collection of categories' do
        expect(json).to be_an(Array)
      end

      it 'should return the total number of collections per category' do
        expect(json[0]).to have_key("collection_total")
      end

      it 'should return the total number of resources per category' do
        expect(json[0]).to have_key("resource_total")
      end

    end

  end

  describe 'POST#create' do

    before do
      sign_in admin
      post :create, :format => :json, :category => attributes_for(:category)
    end

    context 'adding the category as an admin' do

      it { should use_before_action(:require_admin) }
      it { should respond_with(:created) }

      it 'should save to the database' do
        expect(Category.find(category.id)).to eq(category)
      end

      it 'should set the title' do
        expect(Category.find(category.id).title).to eq("category_title")
      end

      it 'should return the new category as a hash' do
        expect(json).to be_a(Hash)
      end

      it 'should return the collection total' do
        expect(json).to have_key("collection_total")
      end

      it 'should return the resource total' do
        expect(json).to have_key("resource_total")
      end

    end

  end

  describe 'DELETE#destroy' do

    before do
      sign_in admin
    end

    context 'with a non-existent id' do

      before do
        delete :destroy, :format => :json, :id => -1
      end

      it { should use_before_action(:require_admin) }
      it { should respond_with(422) }

    end

    context 'with a valid id' do

      before do
        delete :destroy, :format => :json, :id => category.id
      end

      it { should use_before_action(:require_admin) }
      it { should respond_with(204) }

      it 'should remove the category from the database' do
        expect{ Category.find(category.id) }.to raise_error(ActiveRecord::RecordNotFound)
      end

    end

  end

  describe 'PATCH#update' do

    before do
      sign_in admin
    end

    context 'with valid changes' do

      let(:updated_title) { 'Updated Title' }

      before do
        patch :update, :format => :json, :id => category.id, :category => attributes_for(:category, :title => updated_title, :sector_id => sector.id)
      end

      it { should use_before_action(:require_admin) }

      it 'should change the title of the category' do
        expect(Category.find(category.id).title).to eq(updated_title)
      end

      it 'should change the sector_id of the category' do
        expect(Category.find(category.id).sector).to eq(sector)
      end

      it 'should return status OK' do
        expect(response).to have_http_status(:ok)
      end

    end

  end

end