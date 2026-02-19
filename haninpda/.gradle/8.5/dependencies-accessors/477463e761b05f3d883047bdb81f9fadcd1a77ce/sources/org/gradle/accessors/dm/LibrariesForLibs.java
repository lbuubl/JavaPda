package org.gradle.accessors.dm;

import org.gradle.api.NonNullApi;
import org.gradle.api.artifacts.MinimalExternalModuleDependency;
import org.gradle.plugin.use.PluginDependency;
import org.gradle.api.artifacts.ExternalModuleDependencyBundle;
import org.gradle.api.artifacts.MutableVersionConstraint;
import org.gradle.api.provider.Provider;
import org.gradle.api.model.ObjectFactory;
import org.gradle.api.provider.ProviderFactory;
import org.gradle.api.internal.catalog.AbstractExternalDependencyFactory;
import org.gradle.api.internal.catalog.DefaultVersionCatalog;
import java.util.Map;
import org.gradle.api.internal.attributes.ImmutableAttributesFactory;
import org.gradle.api.internal.artifacts.dsl.CapabilityNotationParser;
import javax.inject.Inject;

/**
 * A catalog of dependencies accessible via the `libs` extension.
 */
@NonNullApi
public class LibrariesForLibs extends AbstractExternalDependencyFactory {

    private final AbstractExternalDependencyFactory owner = this;
    private final ComLibraryAccessors laccForComLibraryAccessors = new ComLibraryAccessors(owner);
    private final CommonsLibraryAccessors laccForCommonsLibraryAccessors = new CommonsLibraryAccessors(owner);
    private final IoLibraryAccessors laccForIoLibraryAccessors = new IoLibraryAccessors(owner);
    private final JavaLibraryAccessors laccForJavaLibraryAccessors = new JavaLibraryAccessors(owner);
    private final JavaxLibraryAccessors laccForJavaxLibraryAccessors = new JavaxLibraryAccessors(owner);
    private final Log4jLibraryAccessors laccForLog4jLibraryAccessors = new Log4jLibraryAccessors(owner);
    private final MysqlLibraryAccessors laccForMysqlLibraryAccessors = new MysqlLibraryAccessors(owner);
    private final OrgLibraryAccessors laccForOrgLibraryAccessors = new OrgLibraryAccessors(owner);
    private final VersionAccessors vaccForVersionAccessors = new VersionAccessors(providers, config);
    private final BundleAccessors baccForBundleAccessors = new BundleAccessors(objects, providers, config, attributesFactory, capabilityNotationParser);
    private final PluginAccessors paccForPluginAccessors = new PluginAccessors(providers, config);

    @Inject
    public LibrariesForLibs(DefaultVersionCatalog config, ProviderFactory providers, ObjectFactory objects, ImmutableAttributesFactory attributesFactory, CapabilityNotationParser capabilityNotationParser) {
        super(config, providers, objects, attributesFactory, capabilityNotationParser);
    }

    /**
     * Returns the group of libraries at com
     */
    public ComLibraryAccessors getCom() {
        return laccForComLibraryAccessors;
    }

    /**
     * Returns the group of libraries at commons
     */
    public CommonsLibraryAccessors getCommons() {
        return laccForCommonsLibraryAccessors;
    }

    /**
     * Returns the group of libraries at io
     */
    public IoLibraryAccessors getIo() {
        return laccForIoLibraryAccessors;
    }

    /**
     * Returns the group of libraries at java
     */
    public JavaLibraryAccessors getJava() {
        return laccForJavaLibraryAccessors;
    }

    /**
     * Returns the group of libraries at javax
     */
    public JavaxLibraryAccessors getJavax() {
        return laccForJavaxLibraryAccessors;
    }

    /**
     * Returns the group of libraries at log4j
     */
    public Log4jLibraryAccessors getLog4j() {
        return laccForLog4jLibraryAccessors;
    }

    /**
     * Returns the group of libraries at mysql
     */
    public MysqlLibraryAccessors getMysql() {
        return laccForMysqlLibraryAccessors;
    }

    /**
     * Returns the group of libraries at org
     */
    public OrgLibraryAccessors getOrg() {
        return laccForOrgLibraryAccessors;
    }

    /**
     * Returns the group of versions at versions
     */
    public VersionAccessors getVersions() {
        return vaccForVersionAccessors;
    }

    /**
     * Returns the group of bundles at bundles
     */
    public BundleAccessors getBundles() {
        return baccForBundleAccessors;
    }

    /**
     * Returns the group of plugins at plugins
     */
    public PluginAccessors getPlugins() {
        return paccForPluginAccessors;
    }

    public static class ComLibraryAccessors extends SubDependencyFactory {
        private final ComFasterxmlLibraryAccessors laccForComFasterxmlLibraryAccessors = new ComFasterxmlLibraryAccessors(owner);
        private final ComGoogleLibraryAccessors laccForComGoogleLibraryAccessors = new ComGoogleLibraryAccessors(owner);
        private final ComGooglecodeLibraryAccessors laccForComGooglecodeLibraryAccessors = new ComGooglecodeLibraryAccessors(owner);
        private final ComH2databaseLibraryAccessors laccForComH2databaseLibraryAccessors = new ComH2databaseLibraryAccessors(owner);
        private final ComServletsLibraryAccessors laccForComServletsLibraryAccessors = new ComServletsLibraryAccessors(owner);

        public ComLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Returns the group of libraries at com.fasterxml
         */
        public ComFasterxmlLibraryAccessors getFasterxml() {
            return laccForComFasterxmlLibraryAccessors;
        }

        /**
         * Returns the group of libraries at com.google
         */
        public ComGoogleLibraryAccessors getGoogle() {
            return laccForComGoogleLibraryAccessors;
        }

        /**
         * Returns the group of libraries at com.googlecode
         */
        public ComGooglecodeLibraryAccessors getGooglecode() {
            return laccForComGooglecodeLibraryAccessors;
        }

        /**
         * Returns the group of libraries at com.h2database
         */
        public ComH2databaseLibraryAccessors getH2database() {
            return laccForComH2databaseLibraryAccessors;
        }

        /**
         * Returns the group of libraries at com.servlets
         */
        public ComServletsLibraryAccessors getServlets() {
            return laccForComServletsLibraryAccessors;
        }

    }

    public static class ComFasterxmlLibraryAccessors extends SubDependencyFactory {
        private final ComFasterxmlJacksonLibraryAccessors laccForComFasterxmlJacksonLibraryAccessors = new ComFasterxmlJacksonLibraryAccessors(owner);

        public ComFasterxmlLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Returns the group of libraries at com.fasterxml.jackson
         */
        public ComFasterxmlJacksonLibraryAccessors getJackson() {
            return laccForComFasterxmlJacksonLibraryAccessors;
        }

    }

    public static class ComFasterxmlJacksonLibraryAccessors extends SubDependencyFactory {
        private final ComFasterxmlJacksonCoreLibraryAccessors laccForComFasterxmlJacksonCoreLibraryAccessors = new ComFasterxmlJacksonCoreLibraryAccessors(owner);

        public ComFasterxmlJacksonLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Returns the group of libraries at com.fasterxml.jackson.core
         */
        public ComFasterxmlJacksonCoreLibraryAccessors getCore() {
            return laccForComFasterxmlJacksonCoreLibraryAccessors;
        }

    }

    public static class ComFasterxmlJacksonCoreLibraryAccessors extends SubDependencyFactory {
        private final ComFasterxmlJacksonCoreJacksonLibraryAccessors laccForComFasterxmlJacksonCoreJacksonLibraryAccessors = new ComFasterxmlJacksonCoreJacksonLibraryAccessors(owner);

        public ComFasterxmlJacksonCoreLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Returns the group of libraries at com.fasterxml.jackson.core.jackson
         */
        public ComFasterxmlJacksonCoreJacksonLibraryAccessors getJackson() {
            return laccForComFasterxmlJacksonCoreJacksonLibraryAccessors;
        }

    }

    public static class ComFasterxmlJacksonCoreJacksonLibraryAccessors extends SubDependencyFactory {

        public ComFasterxmlJacksonCoreJacksonLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

            /**
             * Creates a dependency provider for annotations (com.fasterxml.jackson.core:jackson-annotations)
         * with versionRef 'com.fasterxml.jackson.core.jackson.annotations'.
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getAnnotations() {
                return create("com.fasterxml.jackson.core.jackson.annotations");
        }

            /**
             * Creates a dependency provider for core (com.fasterxml.jackson.core:jackson-core)
         * with versionRef 'com.fasterxml.jackson.core.jackson.core'.
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getCore() {
                return create("com.fasterxml.jackson.core.jackson.core");
        }

            /**
             * Creates a dependency provider for databind (com.fasterxml.jackson.core:jackson-databind)
         * with versionRef 'com.fasterxml.jackson.core.jackson.databind'.
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getDatabind() {
                return create("com.fasterxml.jackson.core.jackson.databind");
        }

    }

    public static class ComGoogleLibraryAccessors extends SubDependencyFactory {
        private final ComGoogleCodeLibraryAccessors$1 laccForComGoogleCodeLibraryAccessors$1 = new ComGoogleCodeLibraryAccessors$1(owner);

        public ComGoogleLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Returns the group of libraries at com.google.code
         */
        public ComGoogleCodeLibraryAccessors$1 getCode() {
            return laccForComGoogleCodeLibraryAccessors$1;
        }

    }

    public static class ComGoogleCodeLibraryAccessors$1 extends SubDependencyFactory {
        private final ComGoogleCodeGsonLibraryAccessors laccForComGoogleCodeGsonLibraryAccessors = new ComGoogleCodeGsonLibraryAccessors(owner);

        public ComGoogleCodeLibraryAccessors$1(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Returns the group of libraries at com.google.code.gson
         */
        public ComGoogleCodeGsonLibraryAccessors getGson() {
            return laccForComGoogleCodeGsonLibraryAccessors;
        }

    }

    public static class ComGoogleCodeGsonLibraryAccessors extends SubDependencyFactory {

        public ComGoogleCodeGsonLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

            /**
             * Creates a dependency provider for gson (com.google.code.gson:gson)
         * with versionRef 'com.google.code.gson.gson'.
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getGson() {
                return create("com.google.code.gson.gson");
        }

    }

    public static class ComGooglecodeLibraryAccessors extends SubDependencyFactory {
        private final ComGooglecodeJsonLibraryAccessors laccForComGooglecodeJsonLibraryAccessors = new ComGooglecodeJsonLibraryAccessors(owner);

        public ComGooglecodeLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Returns the group of libraries at com.googlecode.json
         */
        public ComGooglecodeJsonLibraryAccessors getJson() {
            return laccForComGooglecodeJsonLibraryAccessors;
        }

    }

    public static class ComGooglecodeJsonLibraryAccessors extends SubDependencyFactory {
        private final ComGooglecodeJsonSimpleLibraryAccessors laccForComGooglecodeJsonSimpleLibraryAccessors = new ComGooglecodeJsonSimpleLibraryAccessors(owner);

        public ComGooglecodeJsonLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Returns the group of libraries at com.googlecode.json.simple
         */
        public ComGooglecodeJsonSimpleLibraryAccessors getSimple() {
            return laccForComGooglecodeJsonSimpleLibraryAccessors;
        }

    }

    public static class ComGooglecodeJsonSimpleLibraryAccessors extends SubDependencyFactory {
        private final ComGooglecodeJsonSimpleJsonLibraryAccessors laccForComGooglecodeJsonSimpleJsonLibraryAccessors = new ComGooglecodeJsonSimpleJsonLibraryAccessors(owner);

        public ComGooglecodeJsonSimpleLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Returns the group of libraries at com.googlecode.json.simple.json
         */
        public ComGooglecodeJsonSimpleJsonLibraryAccessors getJson() {
            return laccForComGooglecodeJsonSimpleJsonLibraryAccessors;
        }

    }

    public static class ComGooglecodeJsonSimpleJsonLibraryAccessors extends SubDependencyFactory {

        public ComGooglecodeJsonSimpleJsonLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

            /**
             * Creates a dependency provider for simple (com.googlecode.json-simple:json-simple)
         * with versionRef 'com.googlecode.json.simple.json.simple'.
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getSimple() {
                return create("com.googlecode.json.simple.json.simple");
        }

    }

    public static class ComH2databaseLibraryAccessors extends SubDependencyFactory {

        public ComH2databaseLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

            /**
             * Creates a dependency provider for h2 (com.h2database:h2)
         * with versionRef 'com.h2database.h2'.
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getH2() {
                return create("com.h2database.h2");
        }

    }

    public static class ComServletsLibraryAccessors extends SubDependencyFactory {

        public ComServletsLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

            /**
             * Creates a dependency provider for cos (com.servlets:cos)
         * with versionRef 'com.servlets.cos'.
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getCos() {
                return create("com.servlets.cos");
        }

    }

    public static class CommonsLibraryAccessors extends SubDependencyFactory {
        private final CommonsCodecLibraryAccessors laccForCommonsCodecLibraryAccessors = new CommonsCodecLibraryAccessors(owner);
        private final CommonsFileuploadLibraryAccessors laccForCommonsFileuploadLibraryAccessors = new CommonsFileuploadLibraryAccessors(owner);
        private final CommonsIoLibraryAccessors laccForCommonsIoLibraryAccessors = new CommonsIoLibraryAccessors(owner);

        public CommonsLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Returns the group of libraries at commons.codec
         */
        public CommonsCodecLibraryAccessors getCodec() {
            return laccForCommonsCodecLibraryAccessors;
        }

        /**
         * Returns the group of libraries at commons.fileupload
         */
        public CommonsFileuploadLibraryAccessors getFileupload() {
            return laccForCommonsFileuploadLibraryAccessors;
        }

        /**
         * Returns the group of libraries at commons.io
         */
        public CommonsIoLibraryAccessors getIo() {
            return laccForCommonsIoLibraryAccessors;
        }

    }

    public static class CommonsCodecLibraryAccessors extends SubDependencyFactory {
        private final CommonsCodecCommonsLibraryAccessors laccForCommonsCodecCommonsLibraryAccessors = new CommonsCodecCommonsLibraryAccessors(owner);

        public CommonsCodecLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Returns the group of libraries at commons.codec.commons
         */
        public CommonsCodecCommonsLibraryAccessors getCommons() {
            return laccForCommonsCodecCommonsLibraryAccessors;
        }

    }

    public static class CommonsCodecCommonsLibraryAccessors extends SubDependencyFactory {

        public CommonsCodecCommonsLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

            /**
             * Creates a dependency provider for codec (commons-codec:commons-codec)
         * with versionRef 'commons.codec.commons.codec'.
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getCodec() {
                return create("commons.codec.commons.codec");
        }

    }

    public static class CommonsFileuploadLibraryAccessors extends SubDependencyFactory {
        private final CommonsFileuploadCommonsLibraryAccessors laccForCommonsFileuploadCommonsLibraryAccessors = new CommonsFileuploadCommonsLibraryAccessors(owner);

        public CommonsFileuploadLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Returns the group of libraries at commons.fileupload.commons
         */
        public CommonsFileuploadCommonsLibraryAccessors getCommons() {
            return laccForCommonsFileuploadCommonsLibraryAccessors;
        }

    }

    public static class CommonsFileuploadCommonsLibraryAccessors extends SubDependencyFactory {

        public CommonsFileuploadCommonsLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

            /**
             * Creates a dependency provider for fileupload (commons-fileupload:commons-fileupload)
         * with versionRef 'commons.fileupload.commons.fileupload'.
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getFileupload() {
                return create("commons.fileupload.commons.fileupload");
        }

    }

    public static class CommonsIoLibraryAccessors extends SubDependencyFactory {
        private final CommonsIoCommonsLibraryAccessors laccForCommonsIoCommonsLibraryAccessors = new CommonsIoCommonsLibraryAccessors(owner);

        public CommonsIoLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Returns the group of libraries at commons.io.commons
         */
        public CommonsIoCommonsLibraryAccessors getCommons() {
            return laccForCommonsIoCommonsLibraryAccessors;
        }

    }

    public static class CommonsIoCommonsLibraryAccessors extends SubDependencyFactory {

        public CommonsIoCommonsLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

            /**
             * Creates a dependency provider for io (commons-io:commons-io)
         * with versionRef 'commons.io.commons.io'.
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getIo() {
                return create("commons.io.commons.io");
        }

    }

    public static class IoLibraryAccessors extends SubDependencyFactory {
        private final IoJsonwebtokenLibraryAccessors laccForIoJsonwebtokenLibraryAccessors = new IoJsonwebtokenLibraryAccessors(owner);

        public IoLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Returns the group of libraries at io.jsonwebtoken
         */
        public IoJsonwebtokenLibraryAccessors getJsonwebtoken() {
            return laccForIoJsonwebtokenLibraryAccessors;
        }

    }

    public static class IoJsonwebtokenLibraryAccessors extends SubDependencyFactory {
        private final IoJsonwebtokenJjwtLibraryAccessors laccForIoJsonwebtokenJjwtLibraryAccessors = new IoJsonwebtokenJjwtLibraryAccessors(owner);

        public IoJsonwebtokenLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Returns the group of libraries at io.jsonwebtoken.jjwt
         */
        public IoJsonwebtokenJjwtLibraryAccessors getJjwt() {
            return laccForIoJsonwebtokenJjwtLibraryAccessors;
        }

    }

    public static class IoJsonwebtokenJjwtLibraryAccessors extends SubDependencyFactory {

        public IoJsonwebtokenJjwtLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

            /**
             * Creates a dependency provider for api (io.jsonwebtoken:jjwt-api)
         * with versionRef 'io.jsonwebtoken.jjwt.api'.
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getApi() {
                return create("io.jsonwebtoken.jjwt.api");
        }

            /**
             * Creates a dependency provider for impl (io.jsonwebtoken:jjwt-impl)
         * with versionRef 'io.jsonwebtoken.jjwt.impl'.
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getImpl() {
                return create("io.jsonwebtoken.jjwt.impl");
        }

            /**
             * Creates a dependency provider for jackson (io.jsonwebtoken:jjwt-jackson)
         * with versionRef 'io.jsonwebtoken.jjwt.jackson'.
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getJackson() {
                return create("io.jsonwebtoken.jjwt.jackson");
        }

    }

    public static class JavaLibraryAccessors extends SubDependencyFactory {
        private final JavaJwtLibraryAccessors laccForJavaJwtLibraryAccessors = new JavaJwtLibraryAccessors(owner);

        public JavaLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Returns the group of libraries at java.jwt
         */
        public JavaJwtLibraryAccessors getJwt() {
            return laccForJavaJwtLibraryAccessors;
        }

    }

    public static class JavaJwtLibraryAccessors extends SubDependencyFactory {
        private final JavaJwtV3LibraryAccessors laccForJavaJwtV3LibraryAccessors = new JavaJwtV3LibraryAccessors(owner);

        public JavaJwtLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Returns the group of libraries at java.jwt.v3
         */
        public JavaJwtV3LibraryAccessors getV3() {
            return laccForJavaJwtV3LibraryAccessors;
        }

    }

    public static class JavaJwtV3LibraryAccessors extends SubDependencyFactory {
        private final JavaJwtV3V8LibraryAccessors laccForJavaJwtV3V8LibraryAccessors = new JavaJwtV3V8LibraryAccessors(owner);

        public JavaJwtV3LibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Returns the group of libraries at java.jwt.v3.v8
         */
        public JavaJwtV3V8LibraryAccessors getV8() {
            return laccForJavaJwtV3V8LibraryAccessors;
        }

    }

    public static class JavaJwtV3V8LibraryAccessors extends SubDependencyFactory {
        private final JavaJwtV3V8V1LibraryAccessors laccForJavaJwtV3V8V1LibraryAccessors = new JavaJwtV3V8V1LibraryAccessors(owner);

        public JavaJwtV3V8LibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Returns the group of libraries at java.jwt.v3.v8.v1
         */
        public JavaJwtV3V8V1LibraryAccessors getV1() {
            return laccForJavaJwtV3V8V1LibraryAccessors;
        }

    }

    public static class JavaJwtV3V8V1LibraryAccessors extends SubDependencyFactory {
        private final JavaJwtV3V8V1JavaLibraryAccessors laccForJavaJwtV3V8V1JavaLibraryAccessors = new JavaJwtV3V8V1JavaLibraryAccessors(owner);

        public JavaJwtV3V8V1LibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Returns the group of libraries at java.jwt.v3.v8.v1.java
         */
        public JavaJwtV3V8V1JavaLibraryAccessors getJava() {
            return laccForJavaJwtV3V8V1JavaLibraryAccessors;
        }

    }

    public static class JavaJwtV3V8V1JavaLibraryAccessors extends SubDependencyFactory {
        private final JavaJwtV3V8V1JavaJwtLibraryAccessors laccForJavaJwtV3V8V1JavaJwtLibraryAccessors = new JavaJwtV3V8V1JavaJwtLibraryAccessors(owner);

        public JavaJwtV3V8V1JavaLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Returns the group of libraries at java.jwt.v3.v8.v1.java.jwt
         */
        public JavaJwtV3V8V1JavaJwtLibraryAccessors getJwt() {
            return laccForJavaJwtV3V8V1JavaJwtLibraryAccessors;
        }

    }

    public static class JavaJwtV3V8V1JavaJwtLibraryAccessors extends SubDependencyFactory {
        private final JavaJwtV3V8V1JavaJwtV3LibraryAccessors laccForJavaJwtV3V8V1JavaJwtV3LibraryAccessors = new JavaJwtV3V8V1JavaJwtV3LibraryAccessors(owner);

        public JavaJwtV3V8V1JavaJwtLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Returns the group of libraries at java.jwt.v3.v8.v1.java.jwt.v3
         */
        public JavaJwtV3V8V1JavaJwtV3LibraryAccessors getV3() {
            return laccForJavaJwtV3V8V1JavaJwtV3LibraryAccessors;
        }

    }

    public static class JavaJwtV3V8V1JavaJwtV3LibraryAccessors extends SubDependencyFactory {
        private final JavaJwtV3V8V1JavaJwtV3V8LibraryAccessors laccForJavaJwtV3V8V1JavaJwtV3V8LibraryAccessors = new JavaJwtV3V8V1JavaJwtV3V8LibraryAccessors(owner);

        public JavaJwtV3V8V1JavaJwtV3LibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Returns the group of libraries at java.jwt.v3.v8.v1.java.jwt.v3.v8
         */
        public JavaJwtV3V8V1JavaJwtV3V8LibraryAccessors getV8() {
            return laccForJavaJwtV3V8V1JavaJwtV3V8LibraryAccessors;
        }

    }

    public static class JavaJwtV3V8V1JavaJwtV3V8LibraryAccessors extends SubDependencyFactory {

        public JavaJwtV3V8V1JavaJwtV3V8LibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

            /**
             * Creates a dependency provider for v1 (java-jwt-3.8.1:java-jwt-3.8.1)
         * with versionRef 'java.jwt.v3.v8.v1.java.jwt.v3.v8.v1'.
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getV1() {
                return create("java.jwt.v3.v8.v1.java.jwt.v3.v8.v1");
        }

    }

    public static class JavaxLibraryAccessors extends SubDependencyFactory {
        private final JavaxServletLibraryAccessors laccForJavaxServletLibraryAccessors = new JavaxServletLibraryAccessors(owner);

        public JavaxLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Returns the group of libraries at javax.servlet
         */
        public JavaxServletLibraryAccessors getServlet() {
            return laccForJavaxServletLibraryAccessors;
        }

    }

    public static class JavaxServletLibraryAccessors extends SubDependencyFactory {

        public JavaxServletLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

            /**
             * Creates a dependency provider for jstl (javax.servlet:jstl)
         * with versionRef 'javax.servlet.jstl'.
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getJstl() {
                return create("javax.servlet.jstl");
        }

    }

    public static class Log4jLibraryAccessors extends SubDependencyFactory {

        public Log4jLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

            /**
             * Creates a dependency provider for log4j (log4j:log4j)
         * with versionRef 'log4j.log4j'.
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getLog4j() {
                return create("log4j.log4j");
        }

    }

    public static class MysqlLibraryAccessors extends SubDependencyFactory {
        private final MysqlMysqlLibraryAccessors laccForMysqlMysqlLibraryAccessors = new MysqlMysqlLibraryAccessors(owner);

        public MysqlLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Returns the group of libraries at mysql.mysql
         */
        public MysqlMysqlLibraryAccessors getMysql() {
            return laccForMysqlMysqlLibraryAccessors;
        }

    }

    public static class MysqlMysqlLibraryAccessors extends SubDependencyFactory {
        private final MysqlMysqlConnectorLibraryAccessors laccForMysqlMysqlConnectorLibraryAccessors = new MysqlMysqlConnectorLibraryAccessors(owner);

        public MysqlMysqlLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Returns the group of libraries at mysql.mysql.connector
         */
        public MysqlMysqlConnectorLibraryAccessors getConnector() {
            return laccForMysqlMysqlConnectorLibraryAccessors;
        }

    }

    public static class MysqlMysqlConnectorLibraryAccessors extends SubDependencyFactory {

        public MysqlMysqlConnectorLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

            /**
             * Creates a dependency provider for java (mysql:mysql-connector-java)
         * with versionRef 'mysql.mysql.connector.java'.
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getJava() {
                return create("mysql.mysql.connector.java");
        }

    }

    public static class OrgLibraryAccessors extends SubDependencyFactory {
        private final OrgApacheLibraryAccessors laccForOrgApacheLibraryAccessors = new OrgApacheLibraryAccessors(owner);
        private final OrgBgeeLibraryAccessors laccForOrgBgeeLibraryAccessors = new OrgBgeeLibraryAccessors(owner);
        private final OrgEclipseLibraryAccessors laccForOrgEclipseLibraryAccessors = new OrgEclipseLibraryAccessors(owner);
        private final OrgHibernateLibraryAccessors laccForOrgHibernateLibraryAccessors = new OrgHibernateLibraryAccessors(owner);
        private final OrgJavassistLibraryAccessors laccForOrgJavassistLibraryAccessors = new OrgJavassistLibraryAccessors(owner);
        private final OrgMybatisLibraryAccessors laccForOrgMybatisLibraryAccessors = new OrgMybatisLibraryAccessors(owner);
        private final OrgProjectlombokLibraryAccessors laccForOrgProjectlombokLibraryAccessors = new OrgProjectlombokLibraryAccessors(owner);
        private final OrgSpringframeworkLibraryAccessors laccForOrgSpringframeworkLibraryAccessors = new OrgSpringframeworkLibraryAccessors(owner);
        private final OrgWebjarsLibraryAccessors laccForOrgWebjarsLibraryAccessors = new OrgWebjarsLibraryAccessors(owner);

        public OrgLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Returns the group of libraries at org.apache
         */
        public OrgApacheLibraryAccessors getApache() {
            return laccForOrgApacheLibraryAccessors;
        }

        /**
         * Returns the group of libraries at org.bgee
         */
        public OrgBgeeLibraryAccessors getBgee() {
            return laccForOrgBgeeLibraryAccessors;
        }

        /**
         * Returns the group of libraries at org.eclipse
         */
        public OrgEclipseLibraryAccessors getEclipse() {
            return laccForOrgEclipseLibraryAccessors;
        }

        /**
         * Returns the group of libraries at org.hibernate
         */
        public OrgHibernateLibraryAccessors getHibernate() {
            return laccForOrgHibernateLibraryAccessors;
        }

        /**
         * Returns the group of libraries at org.javassist
         */
        public OrgJavassistLibraryAccessors getJavassist() {
            return laccForOrgJavassistLibraryAccessors;
        }

        /**
         * Returns the group of libraries at org.mybatis
         */
        public OrgMybatisLibraryAccessors getMybatis() {
            return laccForOrgMybatisLibraryAccessors;
        }

        /**
         * Returns the group of libraries at org.projectlombok
         */
        public OrgProjectlombokLibraryAccessors getProjectlombok() {
            return laccForOrgProjectlombokLibraryAccessors;
        }

        /**
         * Returns the group of libraries at org.springframework
         */
        public OrgSpringframeworkLibraryAccessors getSpringframework() {
            return laccForOrgSpringframeworkLibraryAccessors;
        }

        /**
         * Returns the group of libraries at org.webjars
         */
        public OrgWebjarsLibraryAccessors getWebjars() {
            return laccForOrgWebjarsLibraryAccessors;
        }

    }

    public static class OrgApacheLibraryAccessors extends SubDependencyFactory {
        private final OrgApacheTilesLibraryAccessors laccForOrgApacheTilesLibraryAccessors = new OrgApacheTilesLibraryAccessors(owner);
        private final OrgApacheTomcatLibraryAccessors laccForOrgApacheTomcatLibraryAccessors = new OrgApacheTomcatLibraryAccessors(owner);

        public OrgApacheLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Returns the group of libraries at org.apache.tiles
         */
        public OrgApacheTilesLibraryAccessors getTiles() {
            return laccForOrgApacheTilesLibraryAccessors;
        }

        /**
         * Returns the group of libraries at org.apache.tomcat
         */
        public OrgApacheTomcatLibraryAccessors getTomcat() {
            return laccForOrgApacheTomcatLibraryAccessors;
        }

    }

    public static class OrgApacheTilesLibraryAccessors extends SubDependencyFactory {
        private final OrgApacheTilesTilesLibraryAccessors laccForOrgApacheTilesTilesLibraryAccessors = new OrgApacheTilesTilesLibraryAccessors(owner);

        public OrgApacheTilesLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Returns the group of libraries at org.apache.tiles.tiles
         */
        public OrgApacheTilesTilesLibraryAccessors getTiles() {
            return laccForOrgApacheTilesTilesLibraryAccessors;
        }

    }

    public static class OrgApacheTilesTilesLibraryAccessors extends SubDependencyFactory {
        private final OrgApacheTilesTilesAutotagLibraryAccessors laccForOrgApacheTilesTilesAutotagLibraryAccessors = new OrgApacheTilesTilesAutotagLibraryAccessors(owner);
        private final OrgApacheTilesTilesRequestLibraryAccessors laccForOrgApacheTilesTilesRequestLibraryAccessors = new OrgApacheTilesTilesRequestLibraryAccessors(owner);

        public OrgApacheTilesTilesLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

            /**
             * Creates a dependency provider for api (org.apache.tiles:tiles-api)
         * with versionRef 'org.apache.tiles.tiles.api'.
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getApi() {
                return create("org.apache.tiles.tiles.api");
        }

            /**
             * Creates a dependency provider for core (org.apache.tiles:tiles-core)
         * with versionRef 'org.apache.tiles.tiles.core'.
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getCore() {
                return create("org.apache.tiles.tiles.core");
        }

            /**
             * Creates a dependency provider for jsp (org.apache.tiles:tiles-jsp)
         * with versionRef 'org.apache.tiles.tiles.jsp'.
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getJsp() {
                return create("org.apache.tiles.tiles.jsp");
        }

            /**
             * Creates a dependency provider for servlet (org.apache.tiles:tiles-servlet)
         * with versionRef 'org.apache.tiles.tiles.servlet'.
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getServlet() {
                return create("org.apache.tiles.tiles.servlet");
        }

            /**
             * Creates a dependency provider for template (org.apache.tiles:tiles-template)
         * with versionRef 'org.apache.tiles.tiles.template'.
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getTemplate() {
                return create("org.apache.tiles.tiles.template");
        }

        /**
         * Returns the group of libraries at org.apache.tiles.tiles.autotag
         */
        public OrgApacheTilesTilesAutotagLibraryAccessors getAutotag() {
            return laccForOrgApacheTilesTilesAutotagLibraryAccessors;
        }

        /**
         * Returns the group of libraries at org.apache.tiles.tiles.request
         */
        public OrgApacheTilesTilesRequestLibraryAccessors getRequest() {
            return laccForOrgApacheTilesTilesRequestLibraryAccessors;
        }

    }

    public static class OrgApacheTilesTilesAutotagLibraryAccessors extends SubDependencyFactory {
        private final OrgApacheTilesTilesAutotagCoreLibraryAccessors laccForOrgApacheTilesTilesAutotagCoreLibraryAccessors = new OrgApacheTilesTilesAutotagCoreLibraryAccessors(owner);

        public OrgApacheTilesTilesAutotagLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Returns the group of libraries at org.apache.tiles.tiles.autotag.core
         */
        public OrgApacheTilesTilesAutotagCoreLibraryAccessors getCore() {
            return laccForOrgApacheTilesTilesAutotagCoreLibraryAccessors;
        }

    }

    public static class OrgApacheTilesTilesAutotagCoreLibraryAccessors extends SubDependencyFactory {

        public OrgApacheTilesTilesAutotagCoreLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

            /**
             * Creates a dependency provider for runtime (org.apache.tiles:tiles-autotag-core-runtime)
         * with versionRef 'org.apache.tiles.tiles.autotag.core.runtime'.
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getRuntime() {
                return create("org.apache.tiles.tiles.autotag.core.runtime");
        }

    }

    public static class OrgApacheTilesTilesRequestLibraryAccessors extends SubDependencyFactory {

        public OrgApacheTilesTilesRequestLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

            /**
             * Creates a dependency provider for api (org.apache.tiles:tiles-request-api)
         * with versionRef 'org.apache.tiles.tiles.request.api'.
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getApi() {
                return create("org.apache.tiles.tiles.request.api");
        }

            /**
             * Creates a dependency provider for jsp (org.apache.tiles:tiles-request-jsp)
         * with versionRef 'org.apache.tiles.tiles.request.jsp'.
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getJsp() {
                return create("org.apache.tiles.tiles.request.jsp");
        }

            /**
             * Creates a dependency provider for servlet (org.apache.tiles:tiles-request-servlet)
         * with versionRef 'org.apache.tiles.tiles.request.servlet'.
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getServlet() {
                return create("org.apache.tiles.tiles.request.servlet");
        }

    }

    public static class OrgApacheTomcatLibraryAccessors extends SubDependencyFactory {
        private final OrgApacheTomcatEmbedLibraryAccessors laccForOrgApacheTomcatEmbedLibraryAccessors = new OrgApacheTomcatEmbedLibraryAccessors(owner);

        public OrgApacheTomcatLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Returns the group of libraries at org.apache.tomcat.embed
         */
        public OrgApacheTomcatEmbedLibraryAccessors getEmbed() {
            return laccForOrgApacheTomcatEmbedLibraryAccessors;
        }

    }

    public static class OrgApacheTomcatEmbedLibraryAccessors extends SubDependencyFactory {
        private final OrgApacheTomcatEmbedTomcatLibraryAccessors laccForOrgApacheTomcatEmbedTomcatLibraryAccessors = new OrgApacheTomcatEmbedTomcatLibraryAccessors(owner);

        public OrgApacheTomcatEmbedLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Returns the group of libraries at org.apache.tomcat.embed.tomcat
         */
        public OrgApacheTomcatEmbedTomcatLibraryAccessors getTomcat() {
            return laccForOrgApacheTomcatEmbedTomcatLibraryAccessors;
        }

    }

    public static class OrgApacheTomcatEmbedTomcatLibraryAccessors extends SubDependencyFactory {
        private final OrgApacheTomcatEmbedTomcatEmbedLibraryAccessors laccForOrgApacheTomcatEmbedTomcatEmbedLibraryAccessors = new OrgApacheTomcatEmbedTomcatEmbedLibraryAccessors(owner);

        public OrgApacheTomcatEmbedTomcatLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Returns the group of libraries at org.apache.tomcat.embed.tomcat.embed
         */
        public OrgApacheTomcatEmbedTomcatEmbedLibraryAccessors getEmbed() {
            return laccForOrgApacheTomcatEmbedTomcatEmbedLibraryAccessors;
        }

    }

    public static class OrgApacheTomcatEmbedTomcatEmbedLibraryAccessors extends SubDependencyFactory {

        public OrgApacheTomcatEmbedTomcatEmbedLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

            /**
             * Creates a dependency provider for jasper (org.apache.tomcat.embed:tomcat-embed-jasper)
         * with versionRef 'org.apache.tomcat.embed.tomcat.embed.jasper'.
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getJasper() {
                return create("org.apache.tomcat.embed.tomcat.embed.jasper");
        }

    }

    public static class OrgBgeeLibraryAccessors extends SubDependencyFactory {
        private final OrgBgeeLog4jdbcLibraryAccessors laccForOrgBgeeLog4jdbcLibraryAccessors = new OrgBgeeLog4jdbcLibraryAccessors(owner);

        public OrgBgeeLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Returns the group of libraries at org.bgee.log4jdbc
         */
        public OrgBgeeLog4jdbcLibraryAccessors getLog4jdbc() {
            return laccForOrgBgeeLog4jdbcLibraryAccessors;
        }

    }

    public static class OrgBgeeLog4jdbcLibraryAccessors extends SubDependencyFactory {
        private final OrgBgeeLog4jdbcLog4j2LibraryAccessors laccForOrgBgeeLog4jdbcLog4j2LibraryAccessors = new OrgBgeeLog4jdbcLog4j2LibraryAccessors(owner);

        public OrgBgeeLog4jdbcLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Returns the group of libraries at org.bgee.log4jdbc.log4j2
         */
        public OrgBgeeLog4jdbcLog4j2LibraryAccessors getLog4j2() {
            return laccForOrgBgeeLog4jdbcLog4j2LibraryAccessors;
        }

    }

    public static class OrgBgeeLog4jdbcLog4j2LibraryAccessors extends SubDependencyFactory {
        private final OrgBgeeLog4jdbcLog4j2Log4jdbcLibraryAccessors laccForOrgBgeeLog4jdbcLog4j2Log4jdbcLibraryAccessors = new OrgBgeeLog4jdbcLog4j2Log4jdbcLibraryAccessors(owner);

        public OrgBgeeLog4jdbcLog4j2LibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Returns the group of libraries at org.bgee.log4jdbc.log4j2.log4jdbc
         */
        public OrgBgeeLog4jdbcLog4j2Log4jdbcLibraryAccessors getLog4jdbc() {
            return laccForOrgBgeeLog4jdbcLog4j2Log4jdbcLibraryAccessors;
        }

    }

    public static class OrgBgeeLog4jdbcLog4j2Log4jdbcLibraryAccessors extends SubDependencyFactory {
        private final OrgBgeeLog4jdbcLog4j2Log4jdbcLog4j2LibraryAccessors laccForOrgBgeeLog4jdbcLog4j2Log4jdbcLog4j2LibraryAccessors = new OrgBgeeLog4jdbcLog4j2Log4jdbcLog4j2LibraryAccessors(owner);

        public OrgBgeeLog4jdbcLog4j2Log4jdbcLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Returns the group of libraries at org.bgee.log4jdbc.log4j2.log4jdbc.log4j2
         */
        public OrgBgeeLog4jdbcLog4j2Log4jdbcLog4j2LibraryAccessors getLog4j2() {
            return laccForOrgBgeeLog4jdbcLog4j2Log4jdbcLog4j2LibraryAccessors;
        }

    }

    public static class OrgBgeeLog4jdbcLog4j2Log4jdbcLog4j2LibraryAccessors extends SubDependencyFactory {
        private final OrgBgeeLog4jdbcLog4j2Log4jdbcLog4j2Jdbc4LibraryAccessors laccForOrgBgeeLog4jdbcLog4j2Log4jdbcLog4j2Jdbc4LibraryAccessors = new OrgBgeeLog4jdbcLog4j2Log4jdbcLog4j2Jdbc4LibraryAccessors(owner);

        public OrgBgeeLog4jdbcLog4j2Log4jdbcLog4j2LibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Returns the group of libraries at org.bgee.log4jdbc.log4j2.log4jdbc.log4j2.jdbc4
         */
        public OrgBgeeLog4jdbcLog4j2Log4jdbcLog4j2Jdbc4LibraryAccessors getJdbc4() {
            return laccForOrgBgeeLog4jdbcLog4j2Log4jdbcLog4j2Jdbc4LibraryAccessors;
        }

    }

    public static class OrgBgeeLog4jdbcLog4j2Log4jdbcLog4j2Jdbc4LibraryAccessors extends SubDependencyFactory {

        public OrgBgeeLog4jdbcLog4j2Log4jdbcLog4j2Jdbc4LibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

            /**
             * Creates a dependency provider for v1 (org.bgee.log4jdbc-log4j2:log4jdbc-log4j2-jdbc4.1)
         * with versionRef 'org.bgee.log4jdbc.log4j2.log4jdbc.log4j2.jdbc4.v1'.
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getV1() {
                return create("org.bgee.log4jdbc.log4j2.log4jdbc.log4j2.jdbc4.v1");
        }

    }

    public static class OrgEclipseLibraryAccessors extends SubDependencyFactory {
        private final OrgEclipseJdtLibraryAccessors laccForOrgEclipseJdtLibraryAccessors = new OrgEclipseJdtLibraryAccessors(owner);

        public OrgEclipseLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Returns the group of libraries at org.eclipse.jdt
         */
        public OrgEclipseJdtLibraryAccessors getJdt() {
            return laccForOrgEclipseJdtLibraryAccessors;
        }

    }

    public static class OrgEclipseJdtLibraryAccessors extends SubDependencyFactory {
        private final OrgEclipseJdtCoreLibraryAccessors laccForOrgEclipseJdtCoreLibraryAccessors = new OrgEclipseJdtCoreLibraryAccessors(owner);

        public OrgEclipseJdtLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Returns the group of libraries at org.eclipse.jdt.core
         */
        public OrgEclipseJdtCoreLibraryAccessors getCore() {
            return laccForOrgEclipseJdtCoreLibraryAccessors;
        }

    }

    public static class OrgEclipseJdtCoreLibraryAccessors extends SubDependencyFactory {
        private final OrgEclipseJdtCoreCompilerLibraryAccessors laccForOrgEclipseJdtCoreCompilerLibraryAccessors = new OrgEclipseJdtCoreCompilerLibraryAccessors(owner);

        public OrgEclipseJdtCoreLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Returns the group of libraries at org.eclipse.jdt.core.compiler
         */
        public OrgEclipseJdtCoreCompilerLibraryAccessors getCompiler() {
            return laccForOrgEclipseJdtCoreCompilerLibraryAccessors;
        }

    }

    public static class OrgEclipseJdtCoreCompilerLibraryAccessors extends SubDependencyFactory {

        public OrgEclipseJdtCoreCompilerLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

            /**
             * Creates a dependency provider for ecj (org.eclipse.jdt.core.compiler:ecj)
         * with versionRef 'org.eclipse.jdt.core.compiler.ecj'.
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getEcj() {
                return create("org.eclipse.jdt.core.compiler.ecj");
        }

    }

    public static class OrgHibernateLibraryAccessors extends SubDependencyFactory {
        private final OrgHibernateHibernateLibraryAccessors laccForOrgHibernateHibernateLibraryAccessors = new OrgHibernateHibernateLibraryAccessors(owner);

        public OrgHibernateLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Returns the group of libraries at org.hibernate.hibernate
         */
        public OrgHibernateHibernateLibraryAccessors getHibernate() {
            return laccForOrgHibernateHibernateLibraryAccessors;
        }

    }

    public static class OrgHibernateHibernateLibraryAccessors extends SubDependencyFactory {

        public OrgHibernateHibernateLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

            /**
             * Creates a dependency provider for core (org.hibernate:hibernate-core)
         * with versionRef 'org.hibernate.hibernate.core'.
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getCore() {
                return create("org.hibernate.hibernate.core");
        }

            /**
             * Creates a dependency provider for entitymanager (org.hibernate:hibernate-entitymanager)
         * with versionRef 'org.hibernate.hibernate.entitymanager'.
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getEntitymanager() {
                return create("org.hibernate.hibernate.entitymanager");
        }

    }

    public static class OrgJavassistLibraryAccessors extends SubDependencyFactory {

        public OrgJavassistLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

            /**
             * Creates a dependency provider for javassist (org.javassist:javassist)
         * with versionRef 'org.javassist.javassist'.
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getJavassist() {
                return create("org.javassist.javassist");
        }

    }

    public static class OrgMybatisLibraryAccessors extends SubDependencyFactory {
        private final OrgMybatisSpringLibraryAccessors laccForOrgMybatisSpringLibraryAccessors = new OrgMybatisSpringLibraryAccessors(owner);

        public OrgMybatisLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Returns the group of libraries at org.mybatis.spring
         */
        public OrgMybatisSpringLibraryAccessors getSpring() {
            return laccForOrgMybatisSpringLibraryAccessors;
        }

    }

    public static class OrgMybatisSpringLibraryAccessors extends SubDependencyFactory {
        private final OrgMybatisSpringBootLibraryAccessors laccForOrgMybatisSpringBootLibraryAccessors = new OrgMybatisSpringBootLibraryAccessors(owner);

        public OrgMybatisSpringLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Returns the group of libraries at org.mybatis.spring.boot
         */
        public OrgMybatisSpringBootLibraryAccessors getBoot() {
            return laccForOrgMybatisSpringBootLibraryAccessors;
        }

    }

    public static class OrgMybatisSpringBootLibraryAccessors extends SubDependencyFactory {
        private final OrgMybatisSpringBootMybatisLibraryAccessors laccForOrgMybatisSpringBootMybatisLibraryAccessors = new OrgMybatisSpringBootMybatisLibraryAccessors(owner);

        public OrgMybatisSpringBootLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Returns the group of libraries at org.mybatis.spring.boot.mybatis
         */
        public OrgMybatisSpringBootMybatisLibraryAccessors getMybatis() {
            return laccForOrgMybatisSpringBootMybatisLibraryAccessors;
        }

    }

    public static class OrgMybatisSpringBootMybatisLibraryAccessors extends SubDependencyFactory {
        private final OrgMybatisSpringBootMybatisSpringLibraryAccessors laccForOrgMybatisSpringBootMybatisSpringLibraryAccessors = new OrgMybatisSpringBootMybatisSpringLibraryAccessors(owner);

        public OrgMybatisSpringBootMybatisLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Returns the group of libraries at org.mybatis.spring.boot.mybatis.spring
         */
        public OrgMybatisSpringBootMybatisSpringLibraryAccessors getSpring() {
            return laccForOrgMybatisSpringBootMybatisSpringLibraryAccessors;
        }

    }

    public static class OrgMybatisSpringBootMybatisSpringLibraryAccessors extends SubDependencyFactory {
        private final OrgMybatisSpringBootMybatisSpringBootLibraryAccessors laccForOrgMybatisSpringBootMybatisSpringBootLibraryAccessors = new OrgMybatisSpringBootMybatisSpringBootLibraryAccessors(owner);

        public OrgMybatisSpringBootMybatisSpringLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Returns the group of libraries at org.mybatis.spring.boot.mybatis.spring.boot
         */
        public OrgMybatisSpringBootMybatisSpringBootLibraryAccessors getBoot() {
            return laccForOrgMybatisSpringBootMybatisSpringBootLibraryAccessors;
        }

    }

    public static class OrgMybatisSpringBootMybatisSpringBootLibraryAccessors extends SubDependencyFactory {

        public OrgMybatisSpringBootMybatisSpringBootLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

            /**
             * Creates a dependency provider for starter (org.mybatis.spring.boot:mybatis-spring-boot-starter)
         * with versionRef 'org.mybatis.spring.boot.mybatis.spring.boot.starter'.
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getStarter() {
                return create("org.mybatis.spring.boot.mybatis.spring.boot.starter");
        }

    }

    public static class OrgProjectlombokLibraryAccessors extends SubDependencyFactory {

        public OrgProjectlombokLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

            /**
             * Creates a dependency provider for lombok (org.projectlombok:lombok)
         * with versionRef 'org.projectlombok.lombok'.
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getLombok() {
                return create("org.projectlombok.lombok");
        }

    }

    public static class OrgSpringframeworkLibraryAccessors extends SubDependencyFactory {
        private final OrgSpringframeworkBootLibraryAccessors laccForOrgSpringframeworkBootLibraryAccessors = new OrgSpringframeworkBootLibraryAccessors(owner);
        private final OrgSpringframeworkSecurityLibraryAccessors laccForOrgSpringframeworkSecurityLibraryAccessors = new OrgSpringframeworkSecurityLibraryAccessors(owner);
        private final OrgSpringframeworkSessionLibraryAccessors laccForOrgSpringframeworkSessionLibraryAccessors = new OrgSpringframeworkSessionLibraryAccessors(owner);

        public OrgSpringframeworkLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Returns the group of libraries at org.springframework.boot
         */
        public OrgSpringframeworkBootLibraryAccessors getBoot() {
            return laccForOrgSpringframeworkBootLibraryAccessors;
        }

        /**
         * Returns the group of libraries at org.springframework.security
         */
        public OrgSpringframeworkSecurityLibraryAccessors getSecurity() {
            return laccForOrgSpringframeworkSecurityLibraryAccessors;
        }

        /**
         * Returns the group of libraries at org.springframework.session
         */
        public OrgSpringframeworkSessionLibraryAccessors getSession() {
            return laccForOrgSpringframeworkSessionLibraryAccessors;
        }

    }

    public static class OrgSpringframeworkBootLibraryAccessors extends SubDependencyFactory {
        private final OrgSpringframeworkBootSpringLibraryAccessors laccForOrgSpringframeworkBootSpringLibraryAccessors = new OrgSpringframeworkBootSpringLibraryAccessors(owner);

        public OrgSpringframeworkBootLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Returns the group of libraries at org.springframework.boot.spring
         */
        public OrgSpringframeworkBootSpringLibraryAccessors getSpring() {
            return laccForOrgSpringframeworkBootSpringLibraryAccessors;
        }

    }

    public static class OrgSpringframeworkBootSpringLibraryAccessors extends SubDependencyFactory {
        private final OrgSpringframeworkBootSpringBootLibraryAccessors laccForOrgSpringframeworkBootSpringBootLibraryAccessors = new OrgSpringframeworkBootSpringBootLibraryAccessors(owner);

        public OrgSpringframeworkBootSpringLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Returns the group of libraries at org.springframework.boot.spring.boot
         */
        public OrgSpringframeworkBootSpringBootLibraryAccessors getBoot() {
            return laccForOrgSpringframeworkBootSpringBootLibraryAccessors;
        }

    }

    public static class OrgSpringframeworkBootSpringBootLibraryAccessors extends SubDependencyFactory {
        private final OrgSpringframeworkBootSpringBootStarterLibraryAccessors laccForOrgSpringframeworkBootSpringBootStarterLibraryAccessors = new OrgSpringframeworkBootSpringBootStarterLibraryAccessors(owner);

        public OrgSpringframeworkBootSpringBootLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

            /**
             * Creates a dependency provider for devtools (org.springframework.boot:spring-boot-devtools)
         * with versionRef 'org.springframework.boot.spring.boot.devtools'.
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getDevtools() {
                return create("org.springframework.boot.spring.boot.devtools");
        }

        /**
         * Returns the group of libraries at org.springframework.boot.spring.boot.starter
         */
        public OrgSpringframeworkBootSpringBootStarterLibraryAccessors getStarter() {
            return laccForOrgSpringframeworkBootSpringBootStarterLibraryAccessors;
        }

    }

    public static class OrgSpringframeworkBootSpringBootStarterLibraryAccessors extends SubDependencyFactory {
        private final OrgSpringframeworkBootSpringBootStarterDataLibraryAccessors laccForOrgSpringframeworkBootSpringBootStarterDataLibraryAccessors = new OrgSpringframeworkBootSpringBootStarterDataLibraryAccessors(owner);

        public OrgSpringframeworkBootSpringBootStarterLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

            /**
             * Creates a dependency provider for aop (org.springframework.boot:spring-boot-starter-aop)
         * with versionRef 'org.springframework.boot.spring.boot.starter.aop'.
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getAop() {
                return create("org.springframework.boot.spring.boot.starter.aop");
        }

            /**
             * Creates a dependency provider for jdbc (org.springframework.boot:spring-boot-starter-jdbc)
         * with versionRef 'org.springframework.boot.spring.boot.starter.jdbc'.
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getJdbc() {
                return create("org.springframework.boot.spring.boot.starter.jdbc");
        }

            /**
             * Creates a dependency provider for mail (org.springframework.boot:spring-boot-starter-mail)
         * with versionRef 'org.springframework.boot.spring.boot.starter.mail'.
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getMail() {
                return create("org.springframework.boot.spring.boot.starter.mail");
        }

            /**
             * Creates a dependency provider for security (org.springframework.boot:spring-boot-starter-security)
         * with versionRef 'org.springframework.boot.spring.boot.starter.security'.
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getSecurity() {
                return create("org.springframework.boot.spring.boot.starter.security");
        }

            /**
             * Creates a dependency provider for test (org.springframework.boot:spring-boot-starter-test)
         * with versionRef 'org.springframework.boot.spring.boot.starter.test'.
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getTest() {
                return create("org.springframework.boot.spring.boot.starter.test");
        }

            /**
             * Creates a dependency provider for thymeleaf (org.springframework.boot:spring-boot-starter-thymeleaf)
         * with versionRef 'org.springframework.boot.spring.boot.starter.thymeleaf'.
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getThymeleaf() {
                return create("org.springframework.boot.spring.boot.starter.thymeleaf");
        }

            /**
             * Creates a dependency provider for tomcat (org.springframework.boot:spring-boot-starter-tomcat)
         * with versionRef 'org.springframework.boot.spring.boot.starter.tomcat'.
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getTomcat() {
                return create("org.springframework.boot.spring.boot.starter.tomcat");
        }

            /**
             * Creates a dependency provider for web (org.springframework.boot:spring-boot-starter-web)
         * with versionRef 'org.springframework.boot.spring.boot.starter.web'.
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getWeb() {
                return create("org.springframework.boot.spring.boot.starter.web");
        }

        /**
         * Returns the group of libraries at org.springframework.boot.spring.boot.starter.data
         */
        public OrgSpringframeworkBootSpringBootStarterDataLibraryAccessors getData() {
            return laccForOrgSpringframeworkBootSpringBootStarterDataLibraryAccessors;
        }

    }

    public static class OrgSpringframeworkBootSpringBootStarterDataLibraryAccessors extends SubDependencyFactory {

        public OrgSpringframeworkBootSpringBootStarterDataLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

            /**
             * Creates a dependency provider for jpa (org.springframework.boot:spring-boot-starter-data-jpa)
         * with versionRef 'org.springframework.boot.spring.boot.starter.data.jpa'.
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getJpa() {
                return create("org.springframework.boot.spring.boot.starter.data.jpa");
        }

    }

    public static class OrgSpringframeworkSecurityLibraryAccessors extends SubDependencyFactory {
        private final OrgSpringframeworkSecuritySpringLibraryAccessors laccForOrgSpringframeworkSecuritySpringLibraryAccessors = new OrgSpringframeworkSecuritySpringLibraryAccessors(owner);

        public OrgSpringframeworkSecurityLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Returns the group of libraries at org.springframework.security.spring
         */
        public OrgSpringframeworkSecuritySpringLibraryAccessors getSpring() {
            return laccForOrgSpringframeworkSecuritySpringLibraryAccessors;
        }

    }

    public static class OrgSpringframeworkSecuritySpringLibraryAccessors extends SubDependencyFactory {
        private final OrgSpringframeworkSecuritySpringSecurityLibraryAccessors laccForOrgSpringframeworkSecuritySpringSecurityLibraryAccessors = new OrgSpringframeworkSecuritySpringSecurityLibraryAccessors(owner);

        public OrgSpringframeworkSecuritySpringLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Returns the group of libraries at org.springframework.security.spring.security
         */
        public OrgSpringframeworkSecuritySpringSecurityLibraryAccessors getSecurity() {
            return laccForOrgSpringframeworkSecuritySpringSecurityLibraryAccessors;
        }

    }

    public static class OrgSpringframeworkSecuritySpringSecurityLibraryAccessors extends SubDependencyFactory {

        public OrgSpringframeworkSecuritySpringSecurityLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

            /**
             * Creates a dependency provider for test (org.springframework.security:spring-security-test)
         * with versionRef 'org.springframework.security.spring.security.test'.
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getTest() {
                return create("org.springframework.security.spring.security.test");
        }

    }

    public static class OrgSpringframeworkSessionLibraryAccessors extends SubDependencyFactory {
        private final OrgSpringframeworkSessionSpringLibraryAccessors laccForOrgSpringframeworkSessionSpringLibraryAccessors = new OrgSpringframeworkSessionSpringLibraryAccessors(owner);

        public OrgSpringframeworkSessionLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Returns the group of libraries at org.springframework.session.spring
         */
        public OrgSpringframeworkSessionSpringLibraryAccessors getSpring() {
            return laccForOrgSpringframeworkSessionSpringLibraryAccessors;
        }

    }

    public static class OrgSpringframeworkSessionSpringLibraryAccessors extends SubDependencyFactory {
        private final OrgSpringframeworkSessionSpringSessionLibraryAccessors laccForOrgSpringframeworkSessionSpringSessionLibraryAccessors = new OrgSpringframeworkSessionSpringSessionLibraryAccessors(owner);

        public OrgSpringframeworkSessionSpringLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Returns the group of libraries at org.springframework.session.spring.session
         */
        public OrgSpringframeworkSessionSpringSessionLibraryAccessors getSession() {
            return laccForOrgSpringframeworkSessionSpringSessionLibraryAccessors;
        }

    }

    public static class OrgSpringframeworkSessionSpringSessionLibraryAccessors extends SubDependencyFactory {

        public OrgSpringframeworkSessionSpringSessionLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

            /**
             * Creates a dependency provider for core (org.springframework.session:spring-session-core)
         * with versionRef 'org.springframework.session.spring.session.core'.
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getCore() {
                return create("org.springframework.session.spring.session.core");
        }

    }

    public static class OrgWebjarsLibraryAccessors extends SubDependencyFactory {

        public OrgWebjarsLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

            /**
             * Creates a dependency provider for bootstrap (org.webjars:bootstrap)
         * with versionRef 'org.webjars.bootstrap'.
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getBootstrap() {
                return create("org.webjars.bootstrap");
        }

    }

    public static class VersionAccessors extends VersionFactory  {

        private final ComVersionAccessors vaccForComVersionAccessors = new ComVersionAccessors(providers, config);
        private final CommonsVersionAccessors vaccForCommonsVersionAccessors = new CommonsVersionAccessors(providers, config);
        private final IoVersionAccessors vaccForIoVersionAccessors = new IoVersionAccessors(providers, config);
        private final JavaVersionAccessors vaccForJavaVersionAccessors = new JavaVersionAccessors(providers, config);
        private final JavaxVersionAccessors vaccForJavaxVersionAccessors = new JavaxVersionAccessors(providers, config);
        private final Log4jVersionAccessors vaccForLog4jVersionAccessors = new Log4jVersionAccessors(providers, config);
        private final MysqlVersionAccessors vaccForMysqlVersionAccessors = new MysqlVersionAccessors(providers, config);
        private final OrgVersionAccessors vaccForOrgVersionAccessors = new OrgVersionAccessors(providers, config);
        public VersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Returns the group of versions at versions.com
         */
        public ComVersionAccessors getCom() {
            return vaccForComVersionAccessors;
        }

        /**
         * Returns the group of versions at versions.commons
         */
        public CommonsVersionAccessors getCommons() {
            return vaccForCommonsVersionAccessors;
        }

        /**
         * Returns the group of versions at versions.io
         */
        public IoVersionAccessors getIo() {
            return vaccForIoVersionAccessors;
        }

        /**
         * Returns the group of versions at versions.java
         */
        public JavaVersionAccessors getJava() {
            return vaccForJavaVersionAccessors;
        }

        /**
         * Returns the group of versions at versions.javax
         */
        public JavaxVersionAccessors getJavax() {
            return vaccForJavaxVersionAccessors;
        }

        /**
         * Returns the group of versions at versions.log4j
         */
        public Log4jVersionAccessors getLog4j() {
            return vaccForLog4jVersionAccessors;
        }

        /**
         * Returns the group of versions at versions.mysql
         */
        public MysqlVersionAccessors getMysql() {
            return vaccForMysqlVersionAccessors;
        }

        /**
         * Returns the group of versions at versions.org
         */
        public OrgVersionAccessors getOrg() {
            return vaccForOrgVersionAccessors;
        }

    }

    public static class ComVersionAccessors extends VersionFactory  {

        private final ComFasterxmlVersionAccessors vaccForComFasterxmlVersionAccessors = new ComFasterxmlVersionAccessors(providers, config);
        private final ComGoogleVersionAccessors vaccForComGoogleVersionAccessors = new ComGoogleVersionAccessors(providers, config);
        private final ComGooglecodeVersionAccessors vaccForComGooglecodeVersionAccessors = new ComGooglecodeVersionAccessors(providers, config);
        private final ComH2databaseVersionAccessors vaccForComH2databaseVersionAccessors = new ComH2databaseVersionAccessors(providers, config);
        private final ComServletsVersionAccessors vaccForComServletsVersionAccessors = new ComServletsVersionAccessors(providers, config);
        public ComVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Returns the group of versions at versions.com.fasterxml
         */
        public ComFasterxmlVersionAccessors getFasterxml() {
            return vaccForComFasterxmlVersionAccessors;
        }

        /**
         * Returns the group of versions at versions.com.google
         */
        public ComGoogleVersionAccessors getGoogle() {
            return vaccForComGoogleVersionAccessors;
        }

        /**
         * Returns the group of versions at versions.com.googlecode
         */
        public ComGooglecodeVersionAccessors getGooglecode() {
            return vaccForComGooglecodeVersionAccessors;
        }

        /**
         * Returns the group of versions at versions.com.h2database
         */
        public ComH2databaseVersionAccessors getH2database() {
            return vaccForComH2databaseVersionAccessors;
        }

        /**
         * Returns the group of versions at versions.com.servlets
         */
        public ComServletsVersionAccessors getServlets() {
            return vaccForComServletsVersionAccessors;
        }

    }

    public static class ComFasterxmlVersionAccessors extends VersionFactory  {

        private final ComFasterxmlJacksonVersionAccessors vaccForComFasterxmlJacksonVersionAccessors = new ComFasterxmlJacksonVersionAccessors(providers, config);
        public ComFasterxmlVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Returns the group of versions at versions.com.fasterxml.jackson
         */
        public ComFasterxmlJacksonVersionAccessors getJackson() {
            return vaccForComFasterxmlJacksonVersionAccessors;
        }

    }

    public static class ComFasterxmlJacksonVersionAccessors extends VersionFactory  {

        private final ComFasterxmlJacksonCoreVersionAccessors vaccForComFasterxmlJacksonCoreVersionAccessors = new ComFasterxmlJacksonCoreVersionAccessors(providers, config);
        public ComFasterxmlJacksonVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Returns the group of versions at versions.com.fasterxml.jackson.core
         */
        public ComFasterxmlJacksonCoreVersionAccessors getCore() {
            return vaccForComFasterxmlJacksonCoreVersionAccessors;
        }

    }

    public static class ComFasterxmlJacksonCoreVersionAccessors extends VersionFactory  {

        private final ComFasterxmlJacksonCoreJacksonVersionAccessors vaccForComFasterxmlJacksonCoreJacksonVersionAccessors = new ComFasterxmlJacksonCoreJacksonVersionAccessors(providers, config);
        public ComFasterxmlJacksonCoreVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Returns the group of versions at versions.com.fasterxml.jackson.core.jackson
         */
        public ComFasterxmlJacksonCoreJacksonVersionAccessors getJackson() {
            return vaccForComFasterxmlJacksonCoreJacksonVersionAccessors;
        }

    }

    public static class ComFasterxmlJacksonCoreJacksonVersionAccessors extends VersionFactory  {

        public ComFasterxmlJacksonCoreJacksonVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

            /**
             * Returns the version associated to this alias: com.fasterxml.jackson.core.jackson.annotations (2.11.3)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getAnnotations() { return getVersion("com.fasterxml.jackson.core.jackson.annotations"); }

            /**
             * Returns the version associated to this alias: com.fasterxml.jackson.core.jackson.core (2.11.3)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getCore() { return getVersion("com.fasterxml.jackson.core.jackson.core"); }

            /**
             * Returns the version associated to this alias: com.fasterxml.jackson.core.jackson.databind (2.11.3)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getDatabind() { return getVersion("com.fasterxml.jackson.core.jackson.databind"); }

    }

    public static class ComGoogleVersionAccessors extends VersionFactory  {

        private final ComGoogleCodeVersionAccessors$1 vaccForComGoogleCodeVersionAccessors$1 = new ComGoogleCodeVersionAccessors$1(providers, config);
        public ComGoogleVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Returns the group of versions at versions.com.google.code
         */
        public ComGoogleCodeVersionAccessors$1 getCode() {
            return vaccForComGoogleCodeVersionAccessors$1;
        }

    }

    public static class ComGoogleCodeVersionAccessors$1 extends VersionFactory  {

        private final ComGoogleCodeGsonVersionAccessors vaccForComGoogleCodeGsonVersionAccessors = new ComGoogleCodeGsonVersionAccessors(providers, config);
        public ComGoogleCodeVersionAccessors$1(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Returns the group of versions at versions.com.google.code.gson
         */
        public ComGoogleCodeGsonVersionAccessors getGson() {
            return vaccForComGoogleCodeGsonVersionAccessors;
        }

    }

    public static class ComGoogleCodeGsonVersionAccessors extends VersionFactory  {

        public ComGoogleCodeGsonVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

            /**
             * Returns the version associated to this alias: com.google.code.gson.gson (2.8.6)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getGson() { return getVersion("com.google.code.gson.gson"); }

    }

    public static class ComGooglecodeVersionAccessors extends VersionFactory  {

        private final ComGooglecodeJsonVersionAccessors vaccForComGooglecodeJsonVersionAccessors = new ComGooglecodeJsonVersionAccessors(providers, config);
        public ComGooglecodeVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Returns the group of versions at versions.com.googlecode.json
         */
        public ComGooglecodeJsonVersionAccessors getJson() {
            return vaccForComGooglecodeJsonVersionAccessors;
        }

    }

    public static class ComGooglecodeJsonVersionAccessors extends VersionFactory  {

        private final ComGooglecodeJsonSimpleVersionAccessors vaccForComGooglecodeJsonSimpleVersionAccessors = new ComGooglecodeJsonSimpleVersionAccessors(providers, config);
        public ComGooglecodeJsonVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Returns the group of versions at versions.com.googlecode.json.simple
         */
        public ComGooglecodeJsonSimpleVersionAccessors getSimple() {
            return vaccForComGooglecodeJsonSimpleVersionAccessors;
        }

    }

    public static class ComGooglecodeJsonSimpleVersionAccessors extends VersionFactory  {

        private final ComGooglecodeJsonSimpleJsonVersionAccessors vaccForComGooglecodeJsonSimpleJsonVersionAccessors = new ComGooglecodeJsonSimpleJsonVersionAccessors(providers, config);
        public ComGooglecodeJsonSimpleVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Returns the group of versions at versions.com.googlecode.json.simple.json
         */
        public ComGooglecodeJsonSimpleJsonVersionAccessors getJson() {
            return vaccForComGooglecodeJsonSimpleJsonVersionAccessors;
        }

    }

    public static class ComGooglecodeJsonSimpleJsonVersionAccessors extends VersionFactory  {

        public ComGooglecodeJsonSimpleJsonVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

            /**
             * Returns the version associated to this alias: com.googlecode.json.simple.json.simple (1.1.1)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getSimple() { return getVersion("com.googlecode.json.simple.json.simple"); }

    }

    public static class ComH2databaseVersionAccessors extends VersionFactory  {

        public ComH2databaseVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

            /**
             * Returns the version associated to this alias: com.h2database.h2 (1.4.200)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getH2() { return getVersion("com.h2database.h2"); }

    }

    public static class ComServletsVersionAccessors extends VersionFactory  {

        public ComServletsVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

            /**
             * Returns the version associated to this alias: com.servlets.cos (09May2002)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getCos() { return getVersion("com.servlets.cos"); }

    }

    public static class CommonsVersionAccessors extends VersionFactory  {

        private final CommonsCodecVersionAccessors vaccForCommonsCodecVersionAccessors = new CommonsCodecVersionAccessors(providers, config);
        private final CommonsFileuploadVersionAccessors vaccForCommonsFileuploadVersionAccessors = new CommonsFileuploadVersionAccessors(providers, config);
        private final CommonsIoVersionAccessors vaccForCommonsIoVersionAccessors = new CommonsIoVersionAccessors(providers, config);
        public CommonsVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Returns the group of versions at versions.commons.codec
         */
        public CommonsCodecVersionAccessors getCodec() {
            return vaccForCommonsCodecVersionAccessors;
        }

        /**
         * Returns the group of versions at versions.commons.fileupload
         */
        public CommonsFileuploadVersionAccessors getFileupload() {
            return vaccForCommonsFileuploadVersionAccessors;
        }

        /**
         * Returns the group of versions at versions.commons.io
         */
        public CommonsIoVersionAccessors getIo() {
            return vaccForCommonsIoVersionAccessors;
        }

    }

    public static class CommonsCodecVersionAccessors extends VersionFactory  {

        private final CommonsCodecCommonsVersionAccessors vaccForCommonsCodecCommonsVersionAccessors = new CommonsCodecCommonsVersionAccessors(providers, config);
        public CommonsCodecVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Returns the group of versions at versions.commons.codec.commons
         */
        public CommonsCodecCommonsVersionAccessors getCommons() {
            return vaccForCommonsCodecCommonsVersionAccessors;
        }

    }

    public static class CommonsCodecCommonsVersionAccessors extends VersionFactory  {

        public CommonsCodecCommonsVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

            /**
             * Returns the version associated to this alias: commons.codec.commons.codec (1.15)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getCodec() { return getVersion("commons.codec.commons.codec"); }

    }

    public static class CommonsFileuploadVersionAccessors extends VersionFactory  {

        private final CommonsFileuploadCommonsVersionAccessors vaccForCommonsFileuploadCommonsVersionAccessors = new CommonsFileuploadCommonsVersionAccessors(providers, config);
        public CommonsFileuploadVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Returns the group of versions at versions.commons.fileupload.commons
         */
        public CommonsFileuploadCommonsVersionAccessors getCommons() {
            return vaccForCommonsFileuploadCommonsVersionAccessors;
        }

    }

    public static class CommonsFileuploadCommonsVersionAccessors extends VersionFactory  {

        public CommonsFileuploadCommonsVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

            /**
             * Returns the version associated to this alias: commons.fileupload.commons.fileupload (1.4)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getFileupload() { return getVersion("commons.fileupload.commons.fileupload"); }

    }

    public static class CommonsIoVersionAccessors extends VersionFactory  {

        private final CommonsIoCommonsVersionAccessors vaccForCommonsIoCommonsVersionAccessors = new CommonsIoCommonsVersionAccessors(providers, config);
        public CommonsIoVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Returns the group of versions at versions.commons.io.commons
         */
        public CommonsIoCommonsVersionAccessors getCommons() {
            return vaccForCommonsIoCommonsVersionAccessors;
        }

    }

    public static class CommonsIoCommonsVersionAccessors extends VersionFactory  {

        public CommonsIoCommonsVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

            /**
             * Returns the version associated to this alias: commons.io.commons.io (2.6)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getIo() { return getVersion("commons.io.commons.io"); }

    }

    public static class IoVersionAccessors extends VersionFactory  {

        private final IoJsonwebtokenVersionAccessors vaccForIoJsonwebtokenVersionAccessors = new IoJsonwebtokenVersionAccessors(providers, config);
        public IoVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Returns the group of versions at versions.io.jsonwebtoken
         */
        public IoJsonwebtokenVersionAccessors getJsonwebtoken() {
            return vaccForIoJsonwebtokenVersionAccessors;
        }

    }

    public static class IoJsonwebtokenVersionAccessors extends VersionFactory  {

        private final IoJsonwebtokenJjwtVersionAccessors vaccForIoJsonwebtokenJjwtVersionAccessors = new IoJsonwebtokenJjwtVersionAccessors(providers, config);
        public IoJsonwebtokenVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Returns the group of versions at versions.io.jsonwebtoken.jjwt
         */
        public IoJsonwebtokenJjwtVersionAccessors getJjwt() {
            return vaccForIoJsonwebtokenJjwtVersionAccessors;
        }

    }

    public static class IoJsonwebtokenJjwtVersionAccessors extends VersionFactory  {

        public IoJsonwebtokenJjwtVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

            /**
             * Returns the version associated to this alias: io.jsonwebtoken.jjwt.api (0.11.2)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getApi() { return getVersion("io.jsonwebtoken.jjwt.api"); }

            /**
             * Returns the version associated to this alias: io.jsonwebtoken.jjwt.impl (0.11.2)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getImpl() { return getVersion("io.jsonwebtoken.jjwt.impl"); }

            /**
             * Returns the version associated to this alias: io.jsonwebtoken.jjwt.jackson (0.11.2)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getJackson() { return getVersion("io.jsonwebtoken.jjwt.jackson"); }

    }

    public static class JavaVersionAccessors extends VersionFactory  {

        private final JavaJwtVersionAccessors vaccForJavaJwtVersionAccessors = new JavaJwtVersionAccessors(providers, config);
        public JavaVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Returns the group of versions at versions.java.jwt
         */
        public JavaJwtVersionAccessors getJwt() {
            return vaccForJavaJwtVersionAccessors;
        }

    }

    public static class JavaJwtVersionAccessors extends VersionFactory  {

        private final JavaJwtV3VersionAccessors vaccForJavaJwtV3VersionAccessors = new JavaJwtV3VersionAccessors(providers, config);
        public JavaJwtVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Returns the group of versions at versions.java.jwt.v3
         */
        public JavaJwtV3VersionAccessors getV3() {
            return vaccForJavaJwtV3VersionAccessors;
        }

    }

    public static class JavaJwtV3VersionAccessors extends VersionFactory  {

        private final JavaJwtV3V8VersionAccessors vaccForJavaJwtV3V8VersionAccessors = new JavaJwtV3V8VersionAccessors(providers, config);
        public JavaJwtV3VersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Returns the group of versions at versions.java.jwt.v3.v8
         */
        public JavaJwtV3V8VersionAccessors getV8() {
            return vaccForJavaJwtV3V8VersionAccessors;
        }

    }

    public static class JavaJwtV3V8VersionAccessors extends VersionFactory  {

        private final JavaJwtV3V8V1VersionAccessors vaccForJavaJwtV3V8V1VersionAccessors = new JavaJwtV3V8V1VersionAccessors(providers, config);
        public JavaJwtV3V8VersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Returns the group of versions at versions.java.jwt.v3.v8.v1
         */
        public JavaJwtV3V8V1VersionAccessors getV1() {
            return vaccForJavaJwtV3V8V1VersionAccessors;
        }

    }

    public static class JavaJwtV3V8V1VersionAccessors extends VersionFactory  {

        private final JavaJwtV3V8V1JavaVersionAccessors vaccForJavaJwtV3V8V1JavaVersionAccessors = new JavaJwtV3V8V1JavaVersionAccessors(providers, config);
        public JavaJwtV3V8V1VersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Returns the group of versions at versions.java.jwt.v3.v8.v1.java
         */
        public JavaJwtV3V8V1JavaVersionAccessors getJava() {
            return vaccForJavaJwtV3V8V1JavaVersionAccessors;
        }

    }

    public static class JavaJwtV3V8V1JavaVersionAccessors extends VersionFactory  {

        private final JavaJwtV3V8V1JavaJwtVersionAccessors vaccForJavaJwtV3V8V1JavaJwtVersionAccessors = new JavaJwtV3V8V1JavaJwtVersionAccessors(providers, config);
        public JavaJwtV3V8V1JavaVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Returns the group of versions at versions.java.jwt.v3.v8.v1.java.jwt
         */
        public JavaJwtV3V8V1JavaJwtVersionAccessors getJwt() {
            return vaccForJavaJwtV3V8V1JavaJwtVersionAccessors;
        }

    }

    public static class JavaJwtV3V8V1JavaJwtVersionAccessors extends VersionFactory  {

        private final JavaJwtV3V8V1JavaJwtV3VersionAccessors vaccForJavaJwtV3V8V1JavaJwtV3VersionAccessors = new JavaJwtV3V8V1JavaJwtV3VersionAccessors(providers, config);
        public JavaJwtV3V8V1JavaJwtVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Returns the group of versions at versions.java.jwt.v3.v8.v1.java.jwt.v3
         */
        public JavaJwtV3V8V1JavaJwtV3VersionAccessors getV3() {
            return vaccForJavaJwtV3V8V1JavaJwtV3VersionAccessors;
        }

    }

    public static class JavaJwtV3V8V1JavaJwtV3VersionAccessors extends VersionFactory  {

        private final JavaJwtV3V8V1JavaJwtV3V8VersionAccessors vaccForJavaJwtV3V8V1JavaJwtV3V8VersionAccessors = new JavaJwtV3V8V1JavaJwtV3V8VersionAccessors(providers, config);
        public JavaJwtV3V8V1JavaJwtV3VersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Returns the group of versions at versions.java.jwt.v3.v8.v1.java.jwt.v3.v8
         */
        public JavaJwtV3V8V1JavaJwtV3V8VersionAccessors getV8() {
            return vaccForJavaJwtV3V8V1JavaJwtV3V8VersionAccessors;
        }

    }

    public static class JavaJwtV3V8V1JavaJwtV3V8VersionAccessors extends VersionFactory  {

        public JavaJwtV3V8V1JavaJwtV3V8VersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

            /**
             * Returns the version associated to this alias: java.jwt.v3.v8.v1.java.jwt.v3.v8.v1 (3.8.1)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getV1() { return getVersion("java.jwt.v3.v8.v1.java.jwt.v3.v8.v1"); }

    }

    public static class JavaxVersionAccessors extends VersionFactory  {

        private final JavaxServletVersionAccessors vaccForJavaxServletVersionAccessors = new JavaxServletVersionAccessors(providers, config);
        public JavaxVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Returns the group of versions at versions.javax.servlet
         */
        public JavaxServletVersionAccessors getServlet() {
            return vaccForJavaxServletVersionAccessors;
        }

    }

    public static class JavaxServletVersionAccessors extends VersionFactory  {

        public JavaxServletVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

            /**
             * Returns the version associated to this alias: javax.servlet.jstl (1.2)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getJstl() { return getVersion("javax.servlet.jstl"); }

    }

    public static class Log4jVersionAccessors extends VersionFactory  {

        public Log4jVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

            /**
             * Returns the version associated to this alias: log4j.log4j (1.2.17)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getLog4j() { return getVersion("log4j.log4j"); }

    }

    public static class MysqlVersionAccessors extends VersionFactory  {

        private final MysqlMysqlVersionAccessors vaccForMysqlMysqlVersionAccessors = new MysqlMysqlVersionAccessors(providers, config);
        public MysqlVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Returns the group of versions at versions.mysql.mysql
         */
        public MysqlMysqlVersionAccessors getMysql() {
            return vaccForMysqlMysqlVersionAccessors;
        }

    }

    public static class MysqlMysqlVersionAccessors extends VersionFactory  {

        private final MysqlMysqlConnectorVersionAccessors vaccForMysqlMysqlConnectorVersionAccessors = new MysqlMysqlConnectorVersionAccessors(providers, config);
        public MysqlMysqlVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Returns the group of versions at versions.mysql.mysql.connector
         */
        public MysqlMysqlConnectorVersionAccessors getConnector() {
            return vaccForMysqlMysqlConnectorVersionAccessors;
        }

    }

    public static class MysqlMysqlConnectorVersionAccessors extends VersionFactory  {

        public MysqlMysqlConnectorVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

            /**
             * Returns the version associated to this alias: mysql.mysql.connector.java (8.0.22)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getJava() { return getVersion("mysql.mysql.connector.java"); }

    }

    public static class OrgVersionAccessors extends VersionFactory  {

        private final OrgApacheVersionAccessors vaccForOrgApacheVersionAccessors = new OrgApacheVersionAccessors(providers, config);
        private final OrgBgeeVersionAccessors vaccForOrgBgeeVersionAccessors = new OrgBgeeVersionAccessors(providers, config);
        private final OrgEclipseVersionAccessors vaccForOrgEclipseVersionAccessors = new OrgEclipseVersionAccessors(providers, config);
        private final OrgHibernateVersionAccessors vaccForOrgHibernateVersionAccessors = new OrgHibernateVersionAccessors(providers, config);
        private final OrgJavassistVersionAccessors vaccForOrgJavassistVersionAccessors = new OrgJavassistVersionAccessors(providers, config);
        private final OrgMybatisVersionAccessors vaccForOrgMybatisVersionAccessors = new OrgMybatisVersionAccessors(providers, config);
        private final OrgProjectlombokVersionAccessors vaccForOrgProjectlombokVersionAccessors = new OrgProjectlombokVersionAccessors(providers, config);
        private final OrgSpringframeworkVersionAccessors vaccForOrgSpringframeworkVersionAccessors = new OrgSpringframeworkVersionAccessors(providers, config);
        private final OrgWebjarsVersionAccessors vaccForOrgWebjarsVersionAccessors = new OrgWebjarsVersionAccessors(providers, config);
        public OrgVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Returns the group of versions at versions.org.apache
         */
        public OrgApacheVersionAccessors getApache() {
            return vaccForOrgApacheVersionAccessors;
        }

        /**
         * Returns the group of versions at versions.org.bgee
         */
        public OrgBgeeVersionAccessors getBgee() {
            return vaccForOrgBgeeVersionAccessors;
        }

        /**
         * Returns the group of versions at versions.org.eclipse
         */
        public OrgEclipseVersionAccessors getEclipse() {
            return vaccForOrgEclipseVersionAccessors;
        }

        /**
         * Returns the group of versions at versions.org.hibernate
         */
        public OrgHibernateVersionAccessors getHibernate() {
            return vaccForOrgHibernateVersionAccessors;
        }

        /**
         * Returns the group of versions at versions.org.javassist
         */
        public OrgJavassistVersionAccessors getJavassist() {
            return vaccForOrgJavassistVersionAccessors;
        }

        /**
         * Returns the group of versions at versions.org.mybatis
         */
        public OrgMybatisVersionAccessors getMybatis() {
            return vaccForOrgMybatisVersionAccessors;
        }

        /**
         * Returns the group of versions at versions.org.projectlombok
         */
        public OrgProjectlombokVersionAccessors getProjectlombok() {
            return vaccForOrgProjectlombokVersionAccessors;
        }

        /**
         * Returns the group of versions at versions.org.springframework
         */
        public OrgSpringframeworkVersionAccessors getSpringframework() {
            return vaccForOrgSpringframeworkVersionAccessors;
        }

        /**
         * Returns the group of versions at versions.org.webjars
         */
        public OrgWebjarsVersionAccessors getWebjars() {
            return vaccForOrgWebjarsVersionAccessors;
        }

    }

    public static class OrgApacheVersionAccessors extends VersionFactory  {

        private final OrgApacheTilesVersionAccessors vaccForOrgApacheTilesVersionAccessors = new OrgApacheTilesVersionAccessors(providers, config);
        private final OrgApacheTomcatVersionAccessors vaccForOrgApacheTomcatVersionAccessors = new OrgApacheTomcatVersionAccessors(providers, config);
        public OrgApacheVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Returns the group of versions at versions.org.apache.tiles
         */
        public OrgApacheTilesVersionAccessors getTiles() {
            return vaccForOrgApacheTilesVersionAccessors;
        }

        /**
         * Returns the group of versions at versions.org.apache.tomcat
         */
        public OrgApacheTomcatVersionAccessors getTomcat() {
            return vaccForOrgApacheTomcatVersionAccessors;
        }

    }

    public static class OrgApacheTilesVersionAccessors extends VersionFactory  {

        private final OrgApacheTilesTilesVersionAccessors vaccForOrgApacheTilesTilesVersionAccessors = new OrgApacheTilesTilesVersionAccessors(providers, config);
        public OrgApacheTilesVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Returns the group of versions at versions.org.apache.tiles.tiles
         */
        public OrgApacheTilesTilesVersionAccessors getTiles() {
            return vaccForOrgApacheTilesTilesVersionAccessors;
        }

    }

    public static class OrgApacheTilesTilesVersionAccessors extends VersionFactory  {

        private final OrgApacheTilesTilesAutotagVersionAccessors vaccForOrgApacheTilesTilesAutotagVersionAccessors = new OrgApacheTilesTilesAutotagVersionAccessors(providers, config);
        private final OrgApacheTilesTilesRequestVersionAccessors vaccForOrgApacheTilesTilesRequestVersionAccessors = new OrgApacheTilesTilesRequestVersionAccessors(providers, config);
        public OrgApacheTilesTilesVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

            /**
             * Returns the version associated to this alias: org.apache.tiles.tiles.api (3.0.7)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getApi() { return getVersion("org.apache.tiles.tiles.api"); }

            /**
             * Returns the version associated to this alias: org.apache.tiles.tiles.core (3.0.7)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getCore() { return getVersion("org.apache.tiles.tiles.core"); }

            /**
             * Returns the version associated to this alias: org.apache.tiles.tiles.jsp (3.0.8)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getJsp() { return getVersion("org.apache.tiles.tiles.jsp"); }

            /**
             * Returns the version associated to this alias: org.apache.tiles.tiles.servlet (3.0.7)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getServlet() { return getVersion("org.apache.tiles.tiles.servlet"); }

            /**
             * Returns the version associated to this alias: org.apache.tiles.tiles.template (3.0.7)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getTemplate() { return getVersion("org.apache.tiles.tiles.template"); }

        /**
         * Returns the group of versions at versions.org.apache.tiles.tiles.autotag
         */
        public OrgApacheTilesTilesAutotagVersionAccessors getAutotag() {
            return vaccForOrgApacheTilesTilesAutotagVersionAccessors;
        }

        /**
         * Returns the group of versions at versions.org.apache.tiles.tiles.request
         */
        public OrgApacheTilesTilesRequestVersionAccessors getRequest() {
            return vaccForOrgApacheTilesTilesRequestVersionAccessors;
        }

    }

    public static class OrgApacheTilesTilesAutotagVersionAccessors extends VersionFactory  {

        private final OrgApacheTilesTilesAutotagCoreVersionAccessors vaccForOrgApacheTilesTilesAutotagCoreVersionAccessors = new OrgApacheTilesTilesAutotagCoreVersionAccessors(providers, config);
        public OrgApacheTilesTilesAutotagVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Returns the group of versions at versions.org.apache.tiles.tiles.autotag.core
         */
        public OrgApacheTilesTilesAutotagCoreVersionAccessors getCore() {
            return vaccForOrgApacheTilesTilesAutotagCoreVersionAccessors;
        }

    }

    public static class OrgApacheTilesTilesAutotagCoreVersionAccessors extends VersionFactory  {

        public OrgApacheTilesTilesAutotagCoreVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

            /**
             * Returns the version associated to this alias: org.apache.tiles.tiles.autotag.core.runtime (1.1.0)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getRuntime() { return getVersion("org.apache.tiles.tiles.autotag.core.runtime"); }

    }

    public static class OrgApacheTilesTilesRequestVersionAccessors extends VersionFactory  {

        public OrgApacheTilesTilesRequestVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

            /**
             * Returns the version associated to this alias: org.apache.tiles.tiles.request.api (1.0.6)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getApi() { return getVersion("org.apache.tiles.tiles.request.api"); }

            /**
             * Returns the version associated to this alias: org.apache.tiles.tiles.request.jsp (1.0.6)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getJsp() { return getVersion("org.apache.tiles.tiles.request.jsp"); }

            /**
             * Returns the version associated to this alias: org.apache.tiles.tiles.request.servlet (1.0.6)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getServlet() { return getVersion("org.apache.tiles.tiles.request.servlet"); }

    }

    public static class OrgApacheTomcatVersionAccessors extends VersionFactory  {

        private final OrgApacheTomcatEmbedVersionAccessors vaccForOrgApacheTomcatEmbedVersionAccessors = new OrgApacheTomcatEmbedVersionAccessors(providers, config);
        public OrgApacheTomcatVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Returns the group of versions at versions.org.apache.tomcat.embed
         */
        public OrgApacheTomcatEmbedVersionAccessors getEmbed() {
            return vaccForOrgApacheTomcatEmbedVersionAccessors;
        }

    }

    public static class OrgApacheTomcatEmbedVersionAccessors extends VersionFactory  {

        private final OrgApacheTomcatEmbedTomcatVersionAccessors vaccForOrgApacheTomcatEmbedTomcatVersionAccessors = new OrgApacheTomcatEmbedTomcatVersionAccessors(providers, config);
        public OrgApacheTomcatEmbedVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Returns the group of versions at versions.org.apache.tomcat.embed.tomcat
         */
        public OrgApacheTomcatEmbedTomcatVersionAccessors getTomcat() {
            return vaccForOrgApacheTomcatEmbedTomcatVersionAccessors;
        }

    }

    public static class OrgApacheTomcatEmbedTomcatVersionAccessors extends VersionFactory  {

        private final OrgApacheTomcatEmbedTomcatEmbedVersionAccessors vaccForOrgApacheTomcatEmbedTomcatEmbedVersionAccessors = new OrgApacheTomcatEmbedTomcatEmbedVersionAccessors(providers, config);
        public OrgApacheTomcatEmbedTomcatVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Returns the group of versions at versions.org.apache.tomcat.embed.tomcat.embed
         */
        public OrgApacheTomcatEmbedTomcatEmbedVersionAccessors getEmbed() {
            return vaccForOrgApacheTomcatEmbedTomcatEmbedVersionAccessors;
        }

    }

    public static class OrgApacheTomcatEmbedTomcatEmbedVersionAccessors extends VersionFactory  {

        public OrgApacheTomcatEmbedTomcatEmbedVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

            /**
             * Returns the version associated to this alias: org.apache.tomcat.embed.tomcat.embed.jasper (9.0.39)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getJasper() { return getVersion("org.apache.tomcat.embed.tomcat.embed.jasper"); }

    }

    public static class OrgBgeeVersionAccessors extends VersionFactory  {

        private final OrgBgeeLog4jdbcVersionAccessors vaccForOrgBgeeLog4jdbcVersionAccessors = new OrgBgeeLog4jdbcVersionAccessors(providers, config);
        public OrgBgeeVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Returns the group of versions at versions.org.bgee.log4jdbc
         */
        public OrgBgeeLog4jdbcVersionAccessors getLog4jdbc() {
            return vaccForOrgBgeeLog4jdbcVersionAccessors;
        }

    }

    public static class OrgBgeeLog4jdbcVersionAccessors extends VersionFactory  {

        private final OrgBgeeLog4jdbcLog4j2VersionAccessors vaccForOrgBgeeLog4jdbcLog4j2VersionAccessors = new OrgBgeeLog4jdbcLog4j2VersionAccessors(providers, config);
        public OrgBgeeLog4jdbcVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Returns the group of versions at versions.org.bgee.log4jdbc.log4j2
         */
        public OrgBgeeLog4jdbcLog4j2VersionAccessors getLog4j2() {
            return vaccForOrgBgeeLog4jdbcLog4j2VersionAccessors;
        }

    }

    public static class OrgBgeeLog4jdbcLog4j2VersionAccessors extends VersionFactory  {

        private final OrgBgeeLog4jdbcLog4j2Log4jdbcVersionAccessors vaccForOrgBgeeLog4jdbcLog4j2Log4jdbcVersionAccessors = new OrgBgeeLog4jdbcLog4j2Log4jdbcVersionAccessors(providers, config);
        public OrgBgeeLog4jdbcLog4j2VersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Returns the group of versions at versions.org.bgee.log4jdbc.log4j2.log4jdbc
         */
        public OrgBgeeLog4jdbcLog4j2Log4jdbcVersionAccessors getLog4jdbc() {
            return vaccForOrgBgeeLog4jdbcLog4j2Log4jdbcVersionAccessors;
        }

    }

    public static class OrgBgeeLog4jdbcLog4j2Log4jdbcVersionAccessors extends VersionFactory  {

        private final OrgBgeeLog4jdbcLog4j2Log4jdbcLog4j2VersionAccessors vaccForOrgBgeeLog4jdbcLog4j2Log4jdbcLog4j2VersionAccessors = new OrgBgeeLog4jdbcLog4j2Log4jdbcLog4j2VersionAccessors(providers, config);
        public OrgBgeeLog4jdbcLog4j2Log4jdbcVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Returns the group of versions at versions.org.bgee.log4jdbc.log4j2.log4jdbc.log4j2
         */
        public OrgBgeeLog4jdbcLog4j2Log4jdbcLog4j2VersionAccessors getLog4j2() {
            return vaccForOrgBgeeLog4jdbcLog4j2Log4jdbcLog4j2VersionAccessors;
        }

    }

    public static class OrgBgeeLog4jdbcLog4j2Log4jdbcLog4j2VersionAccessors extends VersionFactory  {

        private final OrgBgeeLog4jdbcLog4j2Log4jdbcLog4j2Jdbc4VersionAccessors vaccForOrgBgeeLog4jdbcLog4j2Log4jdbcLog4j2Jdbc4VersionAccessors = new OrgBgeeLog4jdbcLog4j2Log4jdbcLog4j2Jdbc4VersionAccessors(providers, config);
        public OrgBgeeLog4jdbcLog4j2Log4jdbcLog4j2VersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Returns the group of versions at versions.org.bgee.log4jdbc.log4j2.log4jdbc.log4j2.jdbc4
         */
        public OrgBgeeLog4jdbcLog4j2Log4jdbcLog4j2Jdbc4VersionAccessors getJdbc4() {
            return vaccForOrgBgeeLog4jdbcLog4j2Log4jdbcLog4j2Jdbc4VersionAccessors;
        }

    }

    public static class OrgBgeeLog4jdbcLog4j2Log4jdbcLog4j2Jdbc4VersionAccessors extends VersionFactory  {

        public OrgBgeeLog4jdbcLog4j2Log4jdbcLog4j2Jdbc4VersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

            /**
             * Returns the version associated to this alias: org.bgee.log4jdbc.log4j2.log4jdbc.log4j2.jdbc4.v1 (1.16)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getV1() { return getVersion("org.bgee.log4jdbc.log4j2.log4jdbc.log4j2.jdbc4.v1"); }

    }

    public static class OrgEclipseVersionAccessors extends VersionFactory  {

        private final OrgEclipseJdtVersionAccessors vaccForOrgEclipseJdtVersionAccessors = new OrgEclipseJdtVersionAccessors(providers, config);
        public OrgEclipseVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Returns the group of versions at versions.org.eclipse.jdt
         */
        public OrgEclipseJdtVersionAccessors getJdt() {
            return vaccForOrgEclipseJdtVersionAccessors;
        }

    }

    public static class OrgEclipseJdtVersionAccessors extends VersionFactory  {

        private final OrgEclipseJdtCoreVersionAccessors vaccForOrgEclipseJdtCoreVersionAccessors = new OrgEclipseJdtCoreVersionAccessors(providers, config);
        public OrgEclipseJdtVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Returns the group of versions at versions.org.eclipse.jdt.core
         */
        public OrgEclipseJdtCoreVersionAccessors getCore() {
            return vaccForOrgEclipseJdtCoreVersionAccessors;
        }

    }

    public static class OrgEclipseJdtCoreVersionAccessors extends VersionFactory  {

        private final OrgEclipseJdtCoreCompilerVersionAccessors vaccForOrgEclipseJdtCoreCompilerVersionAccessors = new OrgEclipseJdtCoreCompilerVersionAccessors(providers, config);
        public OrgEclipseJdtCoreVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Returns the group of versions at versions.org.eclipse.jdt.core.compiler
         */
        public OrgEclipseJdtCoreCompilerVersionAccessors getCompiler() {
            return vaccForOrgEclipseJdtCoreCompilerVersionAccessors;
        }

    }

    public static class OrgEclipseJdtCoreCompilerVersionAccessors extends VersionFactory  {

        public OrgEclipseJdtCoreCompilerVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

            /**
             * Returns the version associated to this alias: org.eclipse.jdt.core.compiler.ecj (4.6.1)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getEcj() { return getVersion("org.eclipse.jdt.core.compiler.ecj"); }

    }

    public static class OrgHibernateVersionAccessors extends VersionFactory  {

        private final OrgHibernateHibernateVersionAccessors vaccForOrgHibernateHibernateVersionAccessors = new OrgHibernateHibernateVersionAccessors(providers, config);
        public OrgHibernateVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Returns the group of versions at versions.org.hibernate.hibernate
         */
        public OrgHibernateHibernateVersionAccessors getHibernate() {
            return vaccForOrgHibernateHibernateVersionAccessors;
        }

    }

    public static class OrgHibernateHibernateVersionAccessors extends VersionFactory  {

        public OrgHibernateHibernateVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

            /**
             * Returns the version associated to this alias: org.hibernate.hibernate.core (5.4.23.Final)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getCore() { return getVersion("org.hibernate.hibernate.core"); }

            /**
             * Returns the version associated to this alias: org.hibernate.hibernate.entitymanager (5.4.23.Final)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getEntitymanager() { return getVersion("org.hibernate.hibernate.entitymanager"); }

    }

    public static class OrgJavassistVersionAccessors extends VersionFactory  {

        public OrgJavassistVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

            /**
             * Returns the version associated to this alias: org.javassist.javassist (3.23.1-GA)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getJavassist() { return getVersion("org.javassist.javassist"); }

    }

    public static class OrgMybatisVersionAccessors extends VersionFactory  {

        private final OrgMybatisSpringVersionAccessors vaccForOrgMybatisSpringVersionAccessors = new OrgMybatisSpringVersionAccessors(providers, config);
        public OrgMybatisVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Returns the group of versions at versions.org.mybatis.spring
         */
        public OrgMybatisSpringVersionAccessors getSpring() {
            return vaccForOrgMybatisSpringVersionAccessors;
        }

    }

    public static class OrgMybatisSpringVersionAccessors extends VersionFactory  {

        private final OrgMybatisSpringBootVersionAccessors vaccForOrgMybatisSpringBootVersionAccessors = new OrgMybatisSpringBootVersionAccessors(providers, config);
        public OrgMybatisSpringVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Returns the group of versions at versions.org.mybatis.spring.boot
         */
        public OrgMybatisSpringBootVersionAccessors getBoot() {
            return vaccForOrgMybatisSpringBootVersionAccessors;
        }

    }

    public static class OrgMybatisSpringBootVersionAccessors extends VersionFactory  {

        private final OrgMybatisSpringBootMybatisVersionAccessors vaccForOrgMybatisSpringBootMybatisVersionAccessors = new OrgMybatisSpringBootMybatisVersionAccessors(providers, config);
        public OrgMybatisSpringBootVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Returns the group of versions at versions.org.mybatis.spring.boot.mybatis
         */
        public OrgMybatisSpringBootMybatisVersionAccessors getMybatis() {
            return vaccForOrgMybatisSpringBootMybatisVersionAccessors;
        }

    }

    public static class OrgMybatisSpringBootMybatisVersionAccessors extends VersionFactory  {

        private final OrgMybatisSpringBootMybatisSpringVersionAccessors vaccForOrgMybatisSpringBootMybatisSpringVersionAccessors = new OrgMybatisSpringBootMybatisSpringVersionAccessors(providers, config);
        public OrgMybatisSpringBootMybatisVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Returns the group of versions at versions.org.mybatis.spring.boot.mybatis.spring
         */
        public OrgMybatisSpringBootMybatisSpringVersionAccessors getSpring() {
            return vaccForOrgMybatisSpringBootMybatisSpringVersionAccessors;
        }

    }

    public static class OrgMybatisSpringBootMybatisSpringVersionAccessors extends VersionFactory  {

        private final OrgMybatisSpringBootMybatisSpringBootVersionAccessors vaccForOrgMybatisSpringBootMybatisSpringBootVersionAccessors = new OrgMybatisSpringBootMybatisSpringBootVersionAccessors(providers, config);
        public OrgMybatisSpringBootMybatisSpringVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Returns the group of versions at versions.org.mybatis.spring.boot.mybatis.spring.boot
         */
        public OrgMybatisSpringBootMybatisSpringBootVersionAccessors getBoot() {
            return vaccForOrgMybatisSpringBootMybatisSpringBootVersionAccessors;
        }

    }

    public static class OrgMybatisSpringBootMybatisSpringBootVersionAccessors extends VersionFactory  {

        public OrgMybatisSpringBootMybatisSpringBootVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

            /**
             * Returns the version associated to this alias: org.mybatis.spring.boot.mybatis.spring.boot.starter (2.1.3)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getStarter() { return getVersion("org.mybatis.spring.boot.mybatis.spring.boot.starter"); }

    }

    public static class OrgProjectlombokVersionAccessors extends VersionFactory  {

        public OrgProjectlombokVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

            /**
             * Returns the version associated to this alias: org.projectlombok.lombok (1.18.16)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getLombok() { return getVersion("org.projectlombok.lombok"); }

    }

    public static class OrgSpringframeworkVersionAccessors extends VersionFactory  {

        private final OrgSpringframeworkBootVersionAccessors vaccForOrgSpringframeworkBootVersionAccessors = new OrgSpringframeworkBootVersionAccessors(providers, config);
        private final OrgSpringframeworkSecurityVersionAccessors vaccForOrgSpringframeworkSecurityVersionAccessors = new OrgSpringframeworkSecurityVersionAccessors(providers, config);
        private final OrgSpringframeworkSessionVersionAccessors vaccForOrgSpringframeworkSessionVersionAccessors = new OrgSpringframeworkSessionVersionAccessors(providers, config);
        public OrgSpringframeworkVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Returns the group of versions at versions.org.springframework.boot
         */
        public OrgSpringframeworkBootVersionAccessors getBoot() {
            return vaccForOrgSpringframeworkBootVersionAccessors;
        }

        /**
         * Returns the group of versions at versions.org.springframework.security
         */
        public OrgSpringframeworkSecurityVersionAccessors getSecurity() {
            return vaccForOrgSpringframeworkSecurityVersionAccessors;
        }

        /**
         * Returns the group of versions at versions.org.springframework.session
         */
        public OrgSpringframeworkSessionVersionAccessors getSession() {
            return vaccForOrgSpringframeworkSessionVersionAccessors;
        }

    }

    public static class OrgSpringframeworkBootVersionAccessors extends VersionFactory  {

        private final OrgSpringframeworkBootSpringVersionAccessors vaccForOrgSpringframeworkBootSpringVersionAccessors = new OrgSpringframeworkBootSpringVersionAccessors(providers, config);
        public OrgSpringframeworkBootVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Returns the group of versions at versions.org.springframework.boot.spring
         */
        public OrgSpringframeworkBootSpringVersionAccessors getSpring() {
            return vaccForOrgSpringframeworkBootSpringVersionAccessors;
        }

    }

    public static class OrgSpringframeworkBootSpringVersionAccessors extends VersionFactory  {

        private final OrgSpringframeworkBootSpringBootVersionAccessors vaccForOrgSpringframeworkBootSpringBootVersionAccessors = new OrgSpringframeworkBootSpringBootVersionAccessors(providers, config);
        public OrgSpringframeworkBootSpringVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Returns the group of versions at versions.org.springframework.boot.spring.boot
         */
        public OrgSpringframeworkBootSpringBootVersionAccessors getBoot() {
            return vaccForOrgSpringframeworkBootSpringBootVersionAccessors;
        }

    }

    public static class OrgSpringframeworkBootSpringBootVersionAccessors extends VersionFactory  {

        private final OrgSpringframeworkBootSpringBootStarterVersionAccessors vaccForOrgSpringframeworkBootSpringBootStarterVersionAccessors = new OrgSpringframeworkBootSpringBootStarterVersionAccessors(providers, config);
        public OrgSpringframeworkBootSpringBootVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

            /**
             * Returns the version associated to this alias: org.springframework.boot.spring.boot.devtools (2.4.0-SNAPSHOT)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getDevtools() { return getVersion("org.springframework.boot.spring.boot.devtools"); }

        /**
         * Returns the group of versions at versions.org.springframework.boot.spring.boot.starter
         */
        public OrgSpringframeworkBootSpringBootStarterVersionAccessors getStarter() {
            return vaccForOrgSpringframeworkBootSpringBootStarterVersionAccessors;
        }

    }

    public static class OrgSpringframeworkBootSpringBootStarterVersionAccessors extends VersionFactory  {

        private final OrgSpringframeworkBootSpringBootStarterDataVersionAccessors vaccForOrgSpringframeworkBootSpringBootStarterDataVersionAccessors = new OrgSpringframeworkBootSpringBootStarterDataVersionAccessors(providers, config);
        public OrgSpringframeworkBootSpringBootStarterVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

            /**
             * Returns the version associated to this alias: org.springframework.boot.spring.boot.starter.aop (2.4.0-SNAPSHOT)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getAop() { return getVersion("org.springframework.boot.spring.boot.starter.aop"); }

            /**
             * Returns the version associated to this alias: org.springframework.boot.spring.boot.starter.jdbc (2.4.0-SNAPSHOT)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getJdbc() { return getVersion("org.springframework.boot.spring.boot.starter.jdbc"); }

            /**
             * Returns the version associated to this alias: org.springframework.boot.spring.boot.starter.mail (2.4.0-SNAPSHOT)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getMail() { return getVersion("org.springframework.boot.spring.boot.starter.mail"); }

            /**
             * Returns the version associated to this alias: org.springframework.boot.spring.boot.starter.security (2.4.0-SNAPSHOT)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getSecurity() { return getVersion("org.springframework.boot.spring.boot.starter.security"); }

            /**
             * Returns the version associated to this alias: org.springframework.boot.spring.boot.starter.test (2.4.0-SNAPSHOT)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getTest() { return getVersion("org.springframework.boot.spring.boot.starter.test"); }

            /**
             * Returns the version associated to this alias: org.springframework.boot.spring.boot.starter.thymeleaf (2.4.0-SNAPSHOT)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getThymeleaf() { return getVersion("org.springframework.boot.spring.boot.starter.thymeleaf"); }

            /**
             * Returns the version associated to this alias: org.springframework.boot.spring.boot.starter.tomcat (2.4.0-SNAPSHOT)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getTomcat() { return getVersion("org.springframework.boot.spring.boot.starter.tomcat"); }

            /**
             * Returns the version associated to this alias: org.springframework.boot.spring.boot.starter.web (2.4.0-SNAPSHOT)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getWeb() { return getVersion("org.springframework.boot.spring.boot.starter.web"); }

        /**
         * Returns the group of versions at versions.org.springframework.boot.spring.boot.starter.data
         */
        public OrgSpringframeworkBootSpringBootStarterDataVersionAccessors getData() {
            return vaccForOrgSpringframeworkBootSpringBootStarterDataVersionAccessors;
        }

    }

    public static class OrgSpringframeworkBootSpringBootStarterDataVersionAccessors extends VersionFactory  {

        public OrgSpringframeworkBootSpringBootStarterDataVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

            /**
             * Returns the version associated to this alias: org.springframework.boot.spring.boot.starter.data.jpa (2.4.0-SNAPSHOT)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getJpa() { return getVersion("org.springframework.boot.spring.boot.starter.data.jpa"); }

    }

    public static class OrgSpringframeworkSecurityVersionAccessors extends VersionFactory  {

        private final OrgSpringframeworkSecuritySpringVersionAccessors vaccForOrgSpringframeworkSecuritySpringVersionAccessors = new OrgSpringframeworkSecuritySpringVersionAccessors(providers, config);
        public OrgSpringframeworkSecurityVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Returns the group of versions at versions.org.springframework.security.spring
         */
        public OrgSpringframeworkSecuritySpringVersionAccessors getSpring() {
            return vaccForOrgSpringframeworkSecuritySpringVersionAccessors;
        }

    }

    public static class OrgSpringframeworkSecuritySpringVersionAccessors extends VersionFactory  {

        private final OrgSpringframeworkSecuritySpringSecurityVersionAccessors vaccForOrgSpringframeworkSecuritySpringSecurityVersionAccessors = new OrgSpringframeworkSecuritySpringSecurityVersionAccessors(providers, config);
        public OrgSpringframeworkSecuritySpringVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Returns the group of versions at versions.org.springframework.security.spring.security
         */
        public OrgSpringframeworkSecuritySpringSecurityVersionAccessors getSecurity() {
            return vaccForOrgSpringframeworkSecuritySpringSecurityVersionAccessors;
        }

    }

    public static class OrgSpringframeworkSecuritySpringSecurityVersionAccessors extends VersionFactory  {

        public OrgSpringframeworkSecuritySpringSecurityVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

            /**
             * Returns the version associated to this alias: org.springframework.security.spring.security.test (5.4.1)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getTest() { return getVersion("org.springframework.security.spring.security.test"); }

    }

    public static class OrgSpringframeworkSessionVersionAccessors extends VersionFactory  {

        private final OrgSpringframeworkSessionSpringVersionAccessors vaccForOrgSpringframeworkSessionSpringVersionAccessors = new OrgSpringframeworkSessionSpringVersionAccessors(providers, config);
        public OrgSpringframeworkSessionVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Returns the group of versions at versions.org.springframework.session.spring
         */
        public OrgSpringframeworkSessionSpringVersionAccessors getSpring() {
            return vaccForOrgSpringframeworkSessionSpringVersionAccessors;
        }

    }

    public static class OrgSpringframeworkSessionSpringVersionAccessors extends VersionFactory  {

        private final OrgSpringframeworkSessionSpringSessionVersionAccessors vaccForOrgSpringframeworkSessionSpringSessionVersionAccessors = new OrgSpringframeworkSessionSpringSessionVersionAccessors(providers, config);
        public OrgSpringframeworkSessionSpringVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Returns the group of versions at versions.org.springframework.session.spring.session
         */
        public OrgSpringframeworkSessionSpringSessionVersionAccessors getSession() {
            return vaccForOrgSpringframeworkSessionSpringSessionVersionAccessors;
        }

    }

    public static class OrgSpringframeworkSessionSpringSessionVersionAccessors extends VersionFactory  {

        public OrgSpringframeworkSessionSpringSessionVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

            /**
             * Returns the version associated to this alias: org.springframework.session.spring.session.core (2.4.1)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getCore() { return getVersion("org.springframework.session.spring.session.core"); }

    }

    public static class OrgWebjarsVersionAccessors extends VersionFactory  {

        public OrgWebjarsVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

            /**
             * Returns the version associated to this alias: org.webjars.bootstrap (3.3.7)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getBootstrap() { return getVersion("org.webjars.bootstrap"); }

    }

    public static class BundleAccessors extends BundleFactory {

        public BundleAccessors(ObjectFactory objects, ProviderFactory providers, DefaultVersionCatalog config, ImmutableAttributesFactory attributesFactory, CapabilityNotationParser capabilityNotationParser) { super(objects, providers, config, attributesFactory, capabilityNotationParser); }

    }

    public static class PluginAccessors extends PluginFactory {

        public PluginAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

    }

}
