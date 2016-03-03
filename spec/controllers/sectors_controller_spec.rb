RSpec.describe SectorsController, type: :controller do
  
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

      it 'should return a collection of sectors' do
        expect(json).to be_an(Array)
      end

      it 'should return the correct number of sectors' do
        expect(json.count).to eq(1)
      end

    end

    context 'logged in user' do

      before do
        sign_in user
        get :index, :format => :json
      end

      it 'should return a collection of sectors' do
        expect(json).to be_an(Array)
      end

      it 'should return the correct number of sectors' do
        expect(json.count).to eq(1)
      end

    end

  end

  describe 'GET#overview' do

    context 'anonymous user' do

      before do
        get :overview, :format => :json
      end

      it { should use_before_action(:require_admin) }
      it { should respond_with(401) }

    end

    context 'non-admin user' do

      before do
        sign_in user
        get :overview, :format => :json
      end

      it { should use_before_action(:require_admin) }
      it { should respond_with(401) }

    end

    context 'admin user' do

      before do
        sign_in admin
        get :overview, :format => :json
      end

      it { should use_before_action(:require_admin) }
      it { should respond_with(200) }

      it 'should return a collection of sectors' do
        expect(json).to be_an(Array)
      end

      it 'should return the total categories per sector' do
        expect(json[0]).to have_key("category_total")
      end

      it 'should return the total collections per sector' do
        expect(json[0]).to have_key("collection_total")
      end

      it 'should return the total resources per sector' do
        expect(json[0]).to have_key("resource_total")
      end

      it 'should return the top 3 resources per sector' do
        expect(json[0]).to have_key("top_three")
      end

    end

  end

  describe 'GET#show' do

    context 'anonymous user' do

      before do
        get :show, :id => sector.id, :format => :json
      end

      it { should respond_with 200 }

      it 'should return a collection of categories within the sector' do
        expect(json["categories"]).to be_an(Array)
      end

      it 'should return the correct number of categories' do
        expect(json["categories"].count).to eq(1)
      end

      it 'should return a collection of collections within the category' do
        expect(json["categories"][0]["collections"]).to be_an(Array)
      end

      it 'should return the correct number of collections' do
        expect(json["categories"][0]["collections"].count).to eq(1)
      end

    end

    context 'logged in user' do

      before do
        sign_in user
        get :show, :id => sector.id, :format => :json
      end

      it { should respond_with 200 }

      it 'should return a collection of categories within the sector' do
        expect(json["categories"]).to be_an(Array)
      end

      it 'should return the correct number of categories' do
        expect(json["categories"].count).to eq(1)
      end

      it 'should return a collection of collections within the category' do
        expect(json["categories"][0]["collections"]).to be_an(Array)
      end

      it 'should return the correct number of collections' do
        expect(json["categories"][0]["collections"].count).to eq(1)
      end

    end

  end

  describe 'POST#create' do

    before do
      sign_in admin
    end

    context 'adding the sector as an admin' do

      before do
        post :create, :format => :json, :sector => attributes_for(:sector)
      end

      it { should use_before_action(:require_admin) }
      it { should respond_with(:created) }

      it 'should save to the database' do
        expect(Sector.find(sector.id)).to eq(sector)
      end

      it 'should set the title' do
        expect(Sector.find(sector.id).title).to eq("sector_title")
      end      

      it 'should return the new sector as a hash' do
        expect(json).to be_a(Hash)
      end

      it 'should return the category total' do
        expect(json).to have_key("category_total")
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
        delete :destroy, :format => :json, :id => sector.id
      end

      it { should use_before_action(:require_admin) }
      it { should respond_with(204) }

      it 'should remove the sector from the database' do
        expect{ Sector.find(sector.id) }.to raise_error(ActiveRecord::RecordNotFound)
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
        patch :update, :format => :json, :id => sector.id, :sector => attributes_for(:sector, :title => updated_title)
      end

      it { should use_before_action(:require_admin) }

      it 'should change the sector in the database' do
        expect(Sector.find(sector.id).title).to eq(updated_title)
      end

      it 'should return status OK' do
        expect(response).to have_http_status(:ok)
      end

    end

  end

end