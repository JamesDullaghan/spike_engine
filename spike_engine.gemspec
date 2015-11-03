$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "spike_engine/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "spike_engine"
  s.version     = SpikeEngine::VERSION
  s.authors     = ["James Dullaghan"]
  s.email       = ["james@pandodev.com"]
  s.homepage    = "TODO"
  s.summary     = "TODO: Summary of SpikeEngine."
  s.description = "TODO: Description of SpikeEngine."
  s.license     = "MIT"

  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.rdoc"]
  s.test_files = Dir["test/**/*"]

  s.add_dependency "rails", "~> 4.2.4"
  s.add_dependency "react_on_rails", "~> 1.0.0.pre"
  s.add_development_dependency "postgresql"
end
