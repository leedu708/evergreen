RSpec.describe Sector, type: :model do

  it { should have_many(:categories).with_foreign_key(:sector_id).dependent(:nullify) }

end