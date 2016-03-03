RSpec.describe Collection, type: :model do

  it { should belong_to(:category) }
  it { should have_many(:resources).with_foreign_key(:collection_id).dependent(:nullify) }
  it { should belong_to(:synthesis).with_foreign_key(:synthesis_id) }

end