

export const AboutSection = () => {
    return <section id="about" className="py-24 px-4 relative">
        <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                About <span className="text-primary"> Me</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <h3 className="text-2xl font-semibold">Passionate Developer & Tech Explorer</h3>
                    
                    <p className="text-muted-foreground">
                        Currently mastering DSA with C++, building projects in Python, and exploring full-stack development.  
                        I also create 3D models using Blender, blending technical skills with artistic creativity.
                    </p>

                    <p className="text-muted-foreground">
                        I'm passionate about solving complex problems and crafting meaningful applications.  
                        Outside of coding, I enjoy chibi art and anime, combining imagination with logic to
                        stay inspired in the ever-evolving tech world.
                    </p>
                </div>
            </div>
        </div>
    </section>;
};