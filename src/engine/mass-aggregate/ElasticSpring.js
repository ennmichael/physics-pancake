import Spring from './Spring';

export default class ElasticSpring extends Spring {
    constructor({ particles, stiffness }) {
        super(particles);
        this.stiffness = stiffness;
    }

    update() {
        this.contract(this.particles[0], this.particles[1]);
        this.contract(this.particles[1], this.particles[0]);
    }

    contract(fromParticle, toParticle) {
        const direction = fromParticle.position.direction(toParticle.position);
        fromParticle.force.add(direction.scaled(this.contractionMagnitude));
    }

    get contractionMagnitude() {
        return this.stiffness * this.lengthDelta;
    }
}