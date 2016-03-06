RSpec.describe ResourcesController, type: :controller do

  let!(:user) { create(:user) }
  let!(:reader) { create(:reader) }
  let!(:curator) { create(:curator) }
  let!(:admin) { create(:admin) }
  let!(:sector) { create(:sector) }
  let!(:category) { create(:category, sector: sector) }
  let!(:collection) { create(:collection, category: category) }
  let!(:resources) { create_list(:resource, 3, owner: user, collection: collection) }
  let!(:upvote) { create(:upvote, user: user, resource: resources.first) }
  let(:json) { JSON.parse(response.body) }

  describe 'GET#index' do

    context 'as an anonymous user' do

      context 'trying to access user index of resources' do

        before do
          get :index, :format => :json, :user_id => user.id
        end

        it { should use_before_action(:require_owner) }
        it { should respond_with(:unauthorized) }

      end

      context 'trying to access collection index of resources' do

        before do
          get :index, :format => :json, :collection_id => collection.id
        end

        it { should use_before_action(:require_owner) }
        it { should respond_with(:ok) }

        it 'should return a collection of resources' do
          expect(json).to be_an(Array)
        end

        it 'should return the owner of the resource' do
          expect(json[0]["owner"]["id"]).to eq(user.id)
        end

        it 'should return the collection of the resource' do
          expect(json[0]["collection"]["id"]).to eq(collection.id)
        end

        it 'should return the total upvotes of the resource' do
          expect(json[0]).to have_key("upvote_count")
        end

        it 'should return the ids of the users who have upvoted the resource' do
          expect(json[0]).to have_key("upvote_ids")
        end

      end

    end

    context 'as a reader' do

      before do
        sign_in reader
      end

      context "trying to access another user's index of resources" do

        before do
          get :index, :format => :json, :user_id => user.id
        end

        it { should use_before_action(:require_owner) }
        it { should respond_with(:unauthorized) }

      end

      context 'trying to access collection index of resources' do

        before do
          get :index, :format => :json, :collection_id => collection.id
        end

        it { should use_before_action(:require_owner) }
        it { should respond_with(:ok) }

        it 'should return a collection of resources' do
          expect(json).to be_an(Array)
        end

        it 'should return the owner of the resource' do
          expect(json[0]["owner"]["id"]).to eq(user.id)
        end

        it 'should return the collection of the resource' do
          expect(json[0]["collection"]["id"]).to eq(collection.id)
        end

        it 'should return the total upvotes of the resource' do
          expect(json[0]).to have_key("upvote_count")
        end

        it 'should return the ids of the users who have upvoted the resource' do
          expect(json[0]).to have_key("upvote_ids")
        end

      end

    end

    context 'as a curator' do

      before do
        sign_in user
      end

      context "trying to access another user's index of resources" do

        before do
          get :index, :format => :json, :user_id => curator.id
        end

        it { should use_before_action(:require_owner) }
        it { should respond_with(:unauthorized) }

      end

      context 'trying to access his/her index of resources' do

        before do
          get :index, :format => :json, :user_id => user.id
        end

        it { should use_before_action(:require_owner) }
        it { should respond_with(:ok) }

        it 'should return a collection of resources' do
          expect(json).to be_an(Array)
        end

        it 'should return the owner username' do
          expect(json[0]).to have_key("owner_username")
        end

        it 'should return the owner id' do
          expect(json[0]).to have_key("owner_id")
        end

        it 'should return the collection of the resource' do
          expect(json[0]).to have_key("collection_name")
        end

        it 'should return the upvotes of the resource' do
          expect(json[0]).to have_key("upvote_count")
        end

      end

      context 'as an admin' do

        before do
          sign_in admin
        end

        context "trying to access another user's index of resources" do

          before do
            get :index, :format => :json, :user_id => user.id
          end

          it { should use_before_action(:require_owner) }
          it { should respond_with(:ok) }

          it 'should return a collection of resources' do
            expect(json).to be_an(Array)
          end

          it 'should return the owner username' do
            expect(json[0]).to have_key("owner_username")
          end

          it 'should return the owner id' do
            expect(json[0]).to have_key("owner_id")
          end

          it 'should return the collection of the resource' do
            expect(json[0]).to have_key("collection_name")
          end

          it 'should return the upvotes of the resource' do
            expect(json[0]).to have_key("upvote_count")
          end

        end

      end

    end

  end

  describe 'GET#show' do

    context 'as an anonymous user' do

      before do
        get :show, :format => :json, :user_id => user.id, :id => resources[0].id
      end

      it { should use_before_action(:require_owner) }
      it { should respond_with(:unauthorized) }

    end

    context 'as a reader' do

      before do
        sign_in reader
        get :show, :format => :json, :user_id => user.id, :id => resources[0].id
      end

      it { should use_before_action(:require_owner) }
      it { should respond_with(:unauthorized) }

    end

    context 'as a curator' do

      context "trying to show another user's resource" do

        before do
          sign_in curator
          get :show, :format => :json, :user_id => user.id, :id => resources[0].id
        end

        it { should use_before_action(:require_owner) }
        it { should respond_with(:unauthorized) }

      end

      context "trying to show the owner's resource" do

        before do
          sign_in user
          get :show, :format => :json, :user_id => user.id, :id => resources[0].id
        end

        it { should use_before_action(:require_owner) }
        it { should respond_with(:ok) }

        it 'should return the resource as a hash' do
          expect(json).to be_a(Hash)
        end

        it 'should return the owner id' do
          expect(json).to have_key("owner_id")
        end

      end

    end

    context 'as an admin' do

      context "trying to show another user's resource" do

        before do
          sign_in admin
          get :show, :format => :json, :user_id => user.id, :id => resources[0].id
        end

        it { should use_before_action(:require_owner) }
        it { should respond_with(:ok) }

        it 'should return the resource as a hash' do
          expect(json).to be_a(Hash)
        end

        it 'should return the owner id' do
          expect(json).to have_key("owner_id")
        end

      end

    end

  end

  describe 'POST#create' do

    let(:owner_id) { user.id }
    let(:collection_id) { collection.id }

    context 'adding a collection as a curator/admin' do

      before do
        sign_in user
        post :create, :format => :json, :resource => attributes_for(:resource, :owner_id => owner_id, :collection_id => collection_id)
      end

      it { should use_before_action(:require_curator) }
      it { should respond_with(:created) }

      it 'should save to the database' do
        expect(Resource.find(resources[0].id)).to eq(resources[0])
      end

      it 'should set the title' do
        expect(Resource.find(resources[0].id).title).to eq("resource_title")
      end

      it 'should set the description' do
        expect(Resource.find(resources[0].id).description).to eq("resource_description")
      end

      it 'should be under a collection' do
        expect(Resource.find(resources[0].id).collection).to eq(collection)
      end

      it 'should have the correct owner' do
        expect(Resource.find(resources[0].id).owner).to eq(user)
      end

      it 'should return the resource' do
        expect(json).to be_a(Hash)
      end

    end

  end

  describe 'DELETE#destroy' do

    context 'as a curator' do

      context "trying to delete another user's resource" do

        before do
          sign_in curator
          delete :destroy, :format => :json, :user_id => user.id, :id => resources[0].id
        end

        it { should use_before_action(:require_owner) }
        it { should use_before_action(:require_curator) }
        it { should respond_with(:unauthorized) }

      end

      context "trying to delete his/her resource" do

        before do
          sign_in user
          delete :destroy, :format => :json, :user_id => user.id, :id => resources[0].id
        end

        it { should use_before_action(:require_owner) }
        it { should use_before_action(:require_curator) }
        it { should respond_with(204) }

      end

    end

    context 'as an admin' do

      before do
        sign_in admin
      end

      context 'with a non-existent id' do

        before do
          delete :destroy, :format => :json, :user_id => admin.id, :id => -1
        end

        it { should use_before_action(:require_owner) }
        it { should use_before_action(:require_curator) }
        it { should respond_with(422) }

      end

      context 'with a valid id' do

        before do
          delete :destroy, :format => :json, :user_id => admin.id, :id => resources[0].id
        end

        it { should use_before_action(:require_owner) }
        it { should use_before_action(:require_curator) }
        it { should respond_with(204) }

        it 'should remove the resource from the database' do
          expect{ Resource.find(resources[0].id) }.to raise_error(ActiveRecord::RecordNotFound)
        end

      end

    end

  end

  describe 'PATCH#update' do

    let(:updated_title) { 'Updated Title' }
    let(:updated_description) { 'Updated Description' }
    let(:collection_id) { collection.id }

    context 'as a curator' do

      context "trying to update another user's resource" do

        before do
          sign_in curator
          patch :update, :format => :json, :user_id => user.id, :id => resources[0].id, :resource => attributes_for(:resource, 
              :title => updated_title,
              :description => updated_description,
              :collection_id => collection_id)
        end

        it { should use_before_action(:require_owner) }
        it { should use_before_action(:require_curator) }
        it { should respond_with(:unauthorized) }

      end

      context "trying to update his/her resource" do

        before do
          sign_in user
          patch :update, :format => :json, :user_id => user.id, :id => resources[0].id, :resource => attributes_for(:resource, 
              :title => updated_title,
              :description => updated_description,
              :collection_id => collection_id)
        end

        it { should use_before_action(:require_owner) }
        it { should use_before_action(:require_curator) }
        it { should respond_with(200) }

      end

    end

    context 'as an admin' do

      before do
        sign_in admin
        patch :update, :format => :json, :user_id => user.id, :id => resources[0].id, :resource => attributes_for(:resource, 
            :title => updated_title,
            :description => updated_description,
            :collection_id => collection_id)
      end  

      context 'with valid params' do

        it { should use_before_action(:require_owner) }
        it { should use_before_action(:require_curator) }
        it { should respond_with(200) }

        it 'should change the title in the database' do
          expect(Resource.find(resources[0].id).title).to eq(updated_title)
        end

        it 'should change the description in the database' do
          expect(Resource.find(resources[0].id).description).to eq(updated_description)
        end

        it 'should change the collection the resource is under in the database' do
          expect(Resource.find(resources[0].id).collection).to eq(collection)
        end

      end

    end    

  end

  describe 'POST#upvote' do

    context 'as an anonymous user' do

      before do
        post :upvote, :format => :json, :id => resources[0].id
      end

      it { should use_before_action(:require_current_user) }
      it { should respond_with(:unauthorized) }

    end

    context 'as a reader' do

      before do
        sign_in reader
        post :upvote, :format => :json, :id => resources[0].id
      end

      it { should use_before_action(:require_current_user) }
      it { should respond_with(200) }

      it 'should return the upvoted resource' do
        expect(json).to be_a(Hash)
      end

      it 'should return the owner of the resource' do
        expect(json["owner"]["id"]).to eq(user.id)
      end

      it 'should return the collection of the resource' do
        expect(json["collection"]["id"]).to eq(collection.id)
      end

      it 'should return the upvotes of the resource' do
        expect(json).to have_key("upvote_count")
      end

      it 'should return the ids of the users who upvoted the resource' do
        expect(json).to have_key("upvote_ids")
      end

    end

    context 'as a curator' do

      before do
        sign_in curator
        post :upvote, :format => :json, :id => resources[0].id
      end

      it { should use_before_action(:require_current_user) }
      it { should respond_with(200) }

      it 'should return the upvoted resource' do
        expect(json).to be_a(Hash)
      end

      it 'should return the owner of the resource' do
        expect(json["owner"]["id"]).to eq(user.id)
      end

      it 'should return the collection of the resource' do
        expect(json["collection"]["id"]).to eq(collection.id)
      end

      it 'should return the upvotes of the resource' do
        expect(json).to have_key("upvote_count")
      end

      it 'should return the ids of the users who upvoted the resource' do
        expect(json).to have_key("upvote_ids")
      end

    end

    context 'as a admin' do

      before do
        sign_in admin
        post :upvote, :format => :json, :id => resources[0].id
      end

      it { should use_before_action(:require_current_user) }
      it { should respond_with(200) }

      it 'should return the upvoted resource' do
        expect(json).to be_a(Hash)
      end

      it 'should return the owner of the resource' do
        expect(json["owner"]["id"]).to eq(user.id)
      end

      it 'should return the collection of the resource' do
        expect(json["collection"]["id"]).to eq(collection.id)
      end

      it 'should return the upvotes of the resource' do
        expect(json).to have_key("upvote_count")
      end

      it 'should return the ids of the users who upvoted the resource' do
        expect(json).to have_key("upvote_ids")
      end

    end

  end

end