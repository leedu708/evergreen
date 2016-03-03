RSpec.describe CollectionsController, type: :controller do

  let!(:user) { create(:user) }
  let!(:admin) { create(:admin) }
  let!(:sector) { create(:sector) }
  let!(:category) { create(:category, sector: sector) }
  let!(:collection) { create(:collection, category: category) }
  let!(:resources) { create_list(:resource, 3, owner: user, collection: collection) }
  let!(:upvote) { create(:upvote, user: user, resource: resources.first) }
  let(:json) { JSON.parse(response.body) }

  describe 'GET#index' do

    context 'as an admin' do

      before do
        sign_in admin
        get :index, :format => :json
      end

      it { should use_before_action(:require_admin) }
      it { should respond_with(200) }

      it 'should return a collection of collections' do
        expect(json).to be_an(Array)
      end

      it 'should return the correct number of collections' do
        expect(json.count).to eq(1)
      end

      it 'should return the resource total' do
        expect(json[0]).to have_key("resource_total")
      end

      it 'should return the resource names' do
        expect(json[0]).to have_key("resource_names")
      end

      it 'should return the IDs of approved resources' do
        expect(json[0]).to have_key("approved_IDs")
      end

    end

  end

  describe 'POST#create' do

    let(:synthesis_id) { resources[0].id }

    context 'adding a collection as an admin' do

      before do
        sign_in admin
        post :create, :format => :json, :collection => attributes_for(:collection, :category_id => category.id, :synthesis_id => synthesis_id)
      end

      it { should use_before_action(:require_admin) }
      it { should respond_with(:created) }

      it 'should save to the database' do
        expect(Collection.find(collection.id)).to eq(collection)
      end

      it 'should set the title' do
        expect(Collection.find(collection.id).title).to eq("collection_title")
      end

      it 'should set the description' do
        expect(Collection.find(collection.id).description).to eq("collection_description")
      end

      it 'should be under a category' do
        expect(Collection.find(collection.id).category).to eq(category)
      end

      it 'should return the new collection as a hash' do
        expect(json).to be_a(Hash)
      end

      it 'should return the resource total' do
        expect(json).to have_key("resource_total")
      end

      it 'should return the IDs of approved resources' do
        expect(json).to have_key("approved_IDs")
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
        delete :destroy, :format => :json, :id => collection.id
      end

      it { should use_before_action(:require_admin) }
      it { should respond_with(204) }

      it 'should remove the collection from the database' do
        expect{ Collection.find(collection.id) }.to raise_error(ActiveRecord::RecordNotFound)
      end

    end

  end

  describe 'PATCH#update' do

    before do
      sign_in admin
    end

    context 'with valid changes' do

      let(:updated_title) { 'Updated Title' }
      let(:updated_description) { 'Updated Description' }
      let(:category_id) { category.id }
      let(:synthesis_id) { resources[0].id }

      before do
        patch :update, :format => :json, :id => collection.id, :collection => attributes_for(:collection, :title => updated_title,
                                      :description => updated_description,
                                      :category_id => category_id,
                                      :synthesis_id => synthesis_id)
      end

      it { should use_before_action(:require_admin) }

      it 'should change the title in the database' do
        expect(Collection.find(collection.id).title).to eq(updated_title)
      end

      it 'should change the description in the database' do
        expect(Collection.find(collection.id).description).to eq(updated_description)
      end

      it 'should change the category the collection is under in the database' do
        expect(Collection.find(collection.id).category).to eq(category)
      end

      it 'should change the synthesis of the collection in the database' do
        expect(Collection.find(collection.id).synthesis).to eq(resources[0])
      end

    end

  end

end