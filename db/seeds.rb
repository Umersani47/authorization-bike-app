# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

role = Role.create(name: 'admin',
            permissions: {})

user = User.create(email: 'admin@gmail.com', password: '123456', role: role)

bike1 = Bike.create( title: 'Kawasaki',
  image_url: 'https://content2.kawasaki.com/ContentStorage/KMC/ProductTrimGroup/32/b2e9dfe4-2062-49f5-847d-0b585695ec7f.jpg?w=750',
  description: "Experience Supersport Obsession with the Ninja® ZX™-6R motorcycle. Push all boundaries with unrivaled performance that prioritizes control during high-performance sport riding. To us, the ability to inspire full confidence and clarity when needed most is the highest exhilaration.",
  price: '180000',
  engine_no: 'AE171QGV17',
  engine_size: '1000cc',
  model: 'NINJA ZX-6R',
  quantity: 20
)
bike1 = Bike.create( title: 'Hayabusa',
  image_url: 'https://suzukicycles.com/-/media/project/cycles/images/products/motorcycles/gsx1300r_hayabusa/2023/color-gallery/gsx1300rrm3_blk_single_seat_cowl_right_2400x1500.png?mh=500&mw=768&hash=06C71151349969FF4BB43FBFFC452A41',
  description: "The Hayabusa’s legendary 1340cc, four-cylinder, DOHC engine is fed by Ride-by-Wire electronic throttle bodies with dual fuel injectors feeding each cylinder, mixing with pressurized air from the Suzuki Ram Air Direct",
  price: '175000',
  engine_no: 'ZZRe7587',
  engine_size: '1200cc',
  model: 'GSX-R1000R',
  quantity: 10
)

bike1 = Bike.create( title: 'BMW',
  image_url: 'https://www.datocms-assets.com/119921/1714044466-bmw-s1000rr-2015-review-used-price-spec_09.jpg?auto=format&w=800',
  description: "The RR is now even more focused and more precisely geared towards pure performance. For those who increasingly demand more. More from themselves. More each lap. And more from their RR.",
  price: '140000',
  engine_no: 'JV532C4D5',
  engine_size: '1200cc',
  model: 'S 1000 RR',
  quantity: 15
)
bike1 = Bike.create( title: 'Aprilia',
  image_url: 'https://wlassets.aprilia.com/wlassets/aprilia/master/Range/RSV4/family_page/2024/wall_image/Aprilia_RSV4_wall-Img_1920x1440_Silverstone-Grey_1/original/Aprilia_RSV4_wall-Img_1920x1440_Silverstone-Grey_1.jpg?1704454461541',
  description: "The RSV4 is much more than a pair of wheels and a powerful engine. The culmination of an ambitious project undertaken by the Aprilia Racing Division and adopting the very best available technology, it features integrated aerodynamic winglets, improved aerodynamic efficiency, 217 horsepower and more torque than ever, all seamlessly combined on the signature Aprilia chassis.",
  price: '165000',
  engine_no: 'XXZW781dx',
  engine_size: '1100cc',
  model: 'RSV4',
  quantity: 30
)