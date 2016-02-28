
[1mFrom:[0m /home/dustin/Dropbox/VCS/evergreen/app/models/sector.rb @ line 41 Sector#top_three:

    [1;34m21[0m: [32mdef[0m [1;34mtop_three[0m
    [1;34m22[0m:   resources = []
    [1;34m23[0m: 
    [1;34m24[0m:   [1;36mself[0m.categories.each [32mdo[0m |category|
    [1;34m25[0m:     category.collections.each [32mdo[0m |collection|
    [1;34m26[0m:       collection.resources.each [32mdo[0m |resource|
    [1;34m27[0m:         resources.push(resource)
    [1;34m28[0m:       [32mend[0m
    [1;34m29[0m:     [32mend[0m
    [1;34m30[0m:   [32mend[0m
    [1;34m31[0m: 
    [1;34m32[0m:   sorted = resources.sort { |left, right| right.upvotes <=> left.upvotes }
    [1;34m33[0m: 
    [1;34m34[0m:   top = []
    [1;34m35[0m:   [1;34m3[0m.times [32mdo[0m |x|
    [1;34m36[0m:     top.push(sorted[x])
    [1;34m37[0m:   [32mend[0m
    [1;34m38[0m: 
    [1;34m39[0m:   top.each [32mdo[0m |resource|
    [1;34m40[0m:     resource[[31m[1;31m"[0m[31mowner[1;31m"[0m[31m[0m => resource.owner.username]
 => [1;34m41[0m:     binding.pry
    [1;34m42[0m:   [32mend[0m
    [1;34m43[0m: 
    [1;34m44[0m:   top
    [1;34m45[0m: [32mend[0m

