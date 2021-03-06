import TerrainElement from './TerrainElement';
import Contact from './Contact';
import Particle from './Particle';
import Vector from '../../Vector';
import Line from '../../Line';

const minimumBounceSpeed = 1.3e-4;

const minimumBounceSpeedSquared = minimumBounceSpeed * minimumBounceSpeed;

interface TerrainContactParams {
    particle: Particle;
    terrainElement: TerrainElement;
}

export default class TerrainContact implements Contact {
    public particle: Particle;
    public terrainElement: TerrainElement;
    public terrainEdge: Line;
    public normal: Vector;
    public interpenetration: number;

    public constructor(params: TerrainContactParams) {
        this.particle = params.particle;
        this.terrainElement = params.terrainElement;
        this.terrainEdge = this.terrainElement.polygon.closestEdge(this.particle.origin);
        this.normal = this.terrainEdge.normal(this.particle.velocity.negated);

        const p = this.terrainEdge.closestPoint(this.particle.origin);
        const d = p.distance(this.particle.origin);

        if (d <= this.particle.radius)
            this.interpenetration = this.particle.radius - d;
        else
            this.interpenetration = this.particle.radius + d;
    }

    public solve(): void {
        this.removeInterpenetration();
        if (this.bounceParticle())
            return;
        this.slideParticle();
        this.applyFriction();
    }

    public removeInterpenetration(): void {
        this.particle.origin.add(this.normal.scaled(this.interpenetration));
    }

    public slideParticle(): void {
        const direction = this.terrainEdge.offset.flippedTowards(this.particle.velocity);
        this.particle.velocity = this.particle.velocity.projected(direction);
    }

    public applyFriction(): void {
        this.particle.velocity.scale(1 - this.terrainElement.friction);
    }

    public bounceParticle(): boolean {
        if (this.particle.speedSquared < minimumBounceSpeedSquared)
            return false;
        const normalVelocity = this.particle.velocity.projected(this.normal).negated;
        this.particle.velocity.add(normalVelocity.scaled(1 + this.terrainElement.restitution));
        return true;
    }
}
